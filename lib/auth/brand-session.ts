import 'server-only'
import { createHmac, scrypt, timingSafeEqual } from 'node:crypto'

export const brandSessionCookie = 'directory_brand_session'
export const brandSessionLifetimeSeconds = 12 * 60 * 60

function getSessionSecret() {
  const secret = process.env.BRAND_SESSION_SECRET
  if (!secret || Buffer.byteLength(secret) < 32) throw new Error('Brand session configuration is incomplete.')
  return secret
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url')
}

export function createBrandSession() {
  const payload = Buffer.from(JSON.stringify({ accessType: 'brand', exp: Date.now() + brandSessionLifetimeSeconds * 1000 })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyBrandSession(value: string | undefined) {
  if (!value) return false
  const [payload, signature, extra] = value.split('.')
  if (!payload || !signature || extra) return false

  try {
    const expected = Buffer.from(sign(payload))
    const actual = Buffer.from(signature)
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false

    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { accessType?: string; exp?: number }
    return parsed.accessType === 'brand' && typeof parsed.exp === 'number' && parsed.exp > Date.now()
  } catch {
    return false
  }
}

function derivePasswordHash(password: string, salt: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (error, derivedKey) => {
      if (error) reject(error)
      else resolve(derivedKey)
    })
  })
}

function parseConfiguredPasswordHash() {
  const configuredHash = process.env.BRAND_ACCESS_PASSWORD_HASH
  if (!configuredHash) return null
  const [algorithm, saltValue, hashValue, extra] = configuredHash.split(':')
  if (algorithm !== 'scrypt' || !saltValue || !hashValue || extra) return null
  try {
    const salt = Buffer.from(saltValue, 'base64url')
    const expected = Buffer.from(hashValue, 'base64url')
    if (salt.length < 16 || expected.length !== 64) return null
    return { salt, expected }
  } catch {
    return null
  }
}

export function brandPasswordHashParses() {
  return parseConfiguredPasswordHash() !== null
}

export async function verifyBrandPassword(password: string) {
  const parsed = parseConfiguredPasswordHash()
  if (!parsed || password.length > 1024) return { completed: false, matches: false }

  try {
    const actual = await derivePasswordHash(password, parsed.salt)
    return { completed: true, matches: timingSafeEqual(actual, parsed.expected) }
  } catch {
    return { completed: false, matches: false }
  }
}

export function getBrandRateLimitKey(ipAddress: string) {
  return createHmac('sha256', getSessionSecret()).update(`brand-rate-limit:${ipAddress}`).digest('hex')
}