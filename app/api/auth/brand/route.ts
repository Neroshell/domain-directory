import { NextResponse } from 'next/server'
import { brandPasswordHashParses, createBrandSession, brandSessionCookie, brandSessionLifetimeSeconds, getBrandRateLimitKey, verifyBrandPassword } from '@/lib/auth/brand-session'
import { isSameOriginRequest } from '@/lib/auth/directory-access'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

function logBrandDiagnostic(details: Record<string, unknown>) {
  console.info(`[brand-auth] ${JSON.stringify(details)}`)
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Request could not be verified.' }, { status: 403 })
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 2048) return NextResponse.json({ error: 'Incorrect access password.' }, { status: 401 })

  const environment = {
    brandPasswordHashExists: Boolean(process.env.BRAND_ACCESS_PASSWORD_HASH),
    brandSessionSecretExists: Boolean(process.env.BRAND_SESSION_SECRET),
    serviceRoleKeyExists: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  }
  let failureCategory = 'unexpected server error'

  try {
    const body = await request.json() as { password?: unknown }
    const password = typeof body.password === 'string' ? body.password : ''
    const passwordHashParses = brandPasswordHashParses()
    logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: false })

    if (!environment.brandPasswordHashExists || !environment.brandSessionSecretExists || !environment.serviceRoleKeyExists) {
      failureCategory = 'configuration missing'
      logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: false, finalFailureCategory: failureCategory })
      return NextResponse.json({ error: 'Brand Access is temporarily unavailable.' }, { status: 503 })
    }
    if (!passwordHashParses) {
      failureCategory = 'invalid password-hash format'
      logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: false, finalFailureCategory: failureCategory })
      return NextResponse.json({ error: 'Brand Access is temporarily unavailable.' }, { status: 503 })
    }

    const forwardedFor = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || 'unknown'
    let allowed: boolean | null = null
    try {
      const admin = createSupabaseAdminClient()
      const result = await admin.rpc('consume_brand_access_attempt', {
        p_bucket_key: getBrandRateLimitKey(forwardedFor),
      })
      if (result.error) {
        logBrandDiagnostic({
          ...environment,
          passwordHashParses,
          passwordVerificationCompleted: false,
          rateLimitRpcSucceeded: false,
          rpcErrorCode: result.error.code ?? 'unknown',
          rpcErrorMessage: result.error.message,
          finalFailureCategory: 'rate-limit RPC/database failure',
        })
        return NextResponse.json({ error: 'Brand Access is temporarily unavailable.' }, { status: 503 })
      }
      allowed = result.data === true
      logBrandDiagnostic({ ...environment, passwordHashParses, rateLimitRpcSucceeded: true })
    } catch {
      logBrandDiagnostic({
        ...environment,
        passwordHashParses,
        passwordVerificationCompleted: false,
        rateLimitRpcSucceeded: false,
        finalFailureCategory: 'rate-limit RPC/database failure',
      })
      return NextResponse.json({ error: 'Brand Access is temporarily unavailable.' }, { status: 503 })
    }
    if (!allowed) {
      failureCategory = 'rate limit rejected attempt'
      logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: false, rateLimitRpcSucceeded: true, finalFailureCategory: failureCategory })
      return NextResponse.json({ error: 'Incorrect access password.' }, { status: 429 })
    }

    const verification = await verifyBrandPassword(password)
    logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: verification.completed })
    if (!verification.completed) {
      failureCategory = 'unexpected server error'
      logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: false, finalFailureCategory: failureCategory })
      return NextResponse.json({ error: 'Brand Access is temporarily unavailable.' }, { status: 503 })
    }
    if (!verification.matches) {
      failureCategory = 'password mismatch'
      logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: true, finalFailureCategory: failureCategory })
      return NextResponse.json({ error: 'Incorrect access password.' }, { status: 401 })
    }

    try {
      const session = createBrandSession()
      const response = NextResponse.json({ authenticated: true, accessType: 'brand' }, { headers: { 'Cache-Control': 'no-store' } })
      response.cookies.set(brandSessionCookie, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: brandSessionLifetimeSeconds,
      })
      logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: true, finalFailureCategory: 'authorized' })
      return response
    } catch {
      failureCategory = 'session signing failure'
      logBrandDiagnostic({ ...environment, passwordHashParses, passwordVerificationCompleted: true, finalFailureCategory: failureCategory })
      return NextResponse.json({ error: 'Brand Access is temporarily unavailable.' }, { status: 503 })
    }
  } catch {
    logBrandDiagnostic({ ...environment, finalFailureCategory: failureCategory })
    return NextResponse.json({ error: 'Brand access is temporarily unavailable.' }, { status: 503 })
  }
}