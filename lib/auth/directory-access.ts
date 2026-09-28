import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { brandSessionCookie, verifyBrandSession } from '@/lib/auth/brand-session'

export type DirectoryAccess = {
  authenticated: true
  accessType: 'internal' | 'brand'
  email?: string
}

function getCookie(request: Request, cookieName: string) {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const entry = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`))
  return entry ? decodeURIComponent(entry.slice(cookieName.length + 1)) : undefined
}

function logAuthorizationDiagnostic(level: 'info' | 'error', details: Record<string, unknown>) {
  const message = `[directory-auth] ${JSON.stringify(details)}`
  if (level === 'error') console.error(message)
  else console.info(message)
}

export async function getDirectoryAccess(request: Request): Promise<DirectoryAccess | null> {
  if (verifyBrandSession(getCookie(request, brandSessionCookie))) {
    return { authenticated: true, accessType: 'brand' }
  }

  const accessToken = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  const serviceRoleConfigured = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!accessToken) {
    logAuthorizationDiagnostic('info', { reason: 'missing token', serviceRoleKeyExists: serviceRoleConfigured })
    return null
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !anonKey) throw new Error('Supabase authentication configuration is incomplete.')

  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  })
  const { data: { user }, error: authError } = await authClient.auth.getUser(accessToken)
  const authenticatedEmail = user?.email ?? null
  if (authError || !user || !authenticatedEmail) {
    logAuthorizationDiagnostic('info', {
      serviceRoleKeyExists: serviceRoleConfigured,
      authenticatedEmail,
      allowlistQuery: 'not run',
      reason: 'invalid token',
    })
    return null
  }

  const email = authenticatedEmail.trim().toLowerCase()
  logAuthorizationDiagnostic('info', {
    serviceRoleKeyExists: serviceRoleConfigured,
    authenticatedEmail,
    normalizedEmail: email,
  })

  let allowedUsers: Array<{ email: string; role: string | null; active: boolean }> | null = null
  let allowlistError: { code?: string } | null = null
  try {
    const admin = createSupabaseAdminClient()
    const result = await admin
      .from('allowed_users')
      .select('email, role, active')
      .ilike('email', email)
      .limit(10)
    allowedUsers = result.data
    allowlistError = result.error
  } catch {
    logAuthorizationDiagnostic('error', {
      serviceRoleKeyExists: serviceRoleConfigured,
      authenticatedEmail,
      normalizedEmail: email,
      allowlistQuery: 'errored before completion',
      reason: 'database query failure',
    })
    throw new Error('Could not verify directory access.')
  }

  if (allowlistError) {
    logAuthorizationDiagnostic('error', {
      serviceRoleKeyExists: serviceRoleConfigured,
      authenticatedEmail,
      normalizedEmail: email,
      allowlistQuery: 'errored',
      queryErrorCode: allowlistError.code ?? 'unknown',
      reason: 'database query failure',
    })
    throw new Error('Could not verify directory access.')
  }

  logAuthorizationDiagnostic('info', {
    authenticatedEmail,
    normalizedEmail: email,
    allowlistQuery: 'succeeded',
    matchedRows: (allowedUsers ?? []).map(({ email: matchedEmail, role, active }) => ({ email: matchedEmail, role, active })),
  })

  const matchingUser = (allowedUsers ?? []).find((entry) => String(entry.email).trim().toLowerCase() === email)
  if (!matchingUser) {
    logAuthorizationDiagnostic('info', { normalizedEmail: email, reason: 'allowed user not found' })
    return null
  }
  if (matchingUser.active !== true) {
    logAuthorizationDiagnostic('info', {
      normalizedEmail: email,
      matchedEmail: matchingUser.email,
      role: matchingUser.role,
      active: matchingUser.active,
      reason: 'inactive user',
    })
    return null
  }

  logAuthorizationDiagnostic('info', {
    normalizedEmail: email,
    matchedEmail: matchingUser.email,
    role: matchingUser.role,
    active: matchingUser.active,
    reason: 'authorized',
  })
  return { authenticated: true, accessType: 'internal', email }
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}