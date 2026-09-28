'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function UnauthorizedPage() {
  const router = useRouter()

  async function signOut() {
    await supabase.auth.signOut()
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/login')
  }

  return <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 text-[#dce6f5]"><div className="w-full max-w-md rounded-2xl border border-[#2a3d57] bg-[#0d1b2d] p-8 text-center shadow-[0_16px_50px_rgba(0,0,0,0.14)]"><h1 className="text-2xl font-semibold text-white">Access denied</h1><p className="mt-3 text-sm leading-6 text-[#9aaec7]">This Google account is not approved for the directory.</p><button type="button" onClick={signOut} className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-[#294563] bg-[#12263d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#16314f]">Sign out</button></div></main>
}
