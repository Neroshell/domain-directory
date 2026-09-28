import { NextResponse } from 'next/server'
import { brandSessionCookie } from '@/lib/auth/brand-session'
import { isSameOriginRequest } from '@/lib/auth/directory-access'

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Request could not be verified.' }, { status: 403 })
  const response = NextResponse.json({ signedOut: true }, { headers: { 'Cache-Control': 'no-store' } })
  response.cookies.set(brandSessionCookie, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}