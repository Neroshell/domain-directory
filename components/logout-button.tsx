'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-[#294563] bg-[#12263d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#16314f]"
    >
      Sign out
    </button>
  )
}
