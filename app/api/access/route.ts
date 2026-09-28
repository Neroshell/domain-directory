import { NextResponse } from 'next/server'
import { getDirectoryAccess } from '@/lib/auth/directory-access'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const access = await getDirectoryAccess(request)
    if (!access) return NextResponse.json({ error: 'Directory access is required.' }, { status: request.headers.has('authorization') ? 403 : 401, headers: { 'Cache-Control': 'no-store' } })
    return NextResponse.json(access, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    console.error(`[directory-auth] ${JSON.stringify({ serviceRoleKeyExists: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY), reason: 'database query failure' })}`)
    return NextResponse.json({ error: 'Could not verify directory access.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}