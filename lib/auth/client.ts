'use client'

import { supabase } from '@/lib/supabase/client'

export type DirectoryAccessCheck =
  | { status: 'authorized'; accessType: 'internal' | 'brand'; email?: string }
  | { status: 'denied' }
  | { status: 'unavailable' }

export async function getDirectoryRequestHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  const headers: Record<string, string> = {}
  if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`
  return headers
}

export async function requestDirectoryAccess() {
  try {
    const headers = await getDirectoryRequestHeaders()
    const response = await fetch('/api/access', { headers, cache: 'no-store' })
    if (response.status >= 500) return { status: 'unavailable' } satisfies DirectoryAccessCheck
    if (!response.ok) return { status: 'denied' } satisfies DirectoryAccessCheck
    const access = await response.json() as { authenticated: true; accessType: 'internal' | 'brand'; email?: string }
    return { status: 'authorized', accessType: access.accessType, email: access.email } satisfies DirectoryAccessCheck
  } catch {
    return { status: 'unavailable' } satisfies DirectoryAccessCheck
  }
}