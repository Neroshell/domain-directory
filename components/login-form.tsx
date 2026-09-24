'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGoogleSignIn() {
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 text-[#dce6f5]">
      <div className="w-full max-w-md rounded-2xl border border-[#1c3048] bg-[#0c1a2b] p-8 shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#3868f4] text-base font-bold italic text-white">S</span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d84a3]">Private access</p>
            <h1 className="text-2xl font-semibold text-white">Domain Directory</h1>
          </div>
        </div>

        <p className="text-sm text-[#9aaec7]">
          Sign in with your approved Google account to access the directory.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-[#5c2b39] bg-[#2a1a22] px-3 py-2 text-sm text-[#ffb4c1]">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3964f4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4b73ff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </button>
      </div>
    </main>
  )
}
