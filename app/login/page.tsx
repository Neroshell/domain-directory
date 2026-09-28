'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { requestDirectoryAccess } from '@/lib/auth/client'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'choices' | 'brand'>('choices')
  const [loading, setLoading] = useState<'google' | 'brand' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [password, setPassword] = useState('')

  useEffect(() => {
    let active = true

    async function checkSession() {
      const access = await requestDirectoryAccess()
      if (!active) return
      if (access.status === 'authorized') {
        router.replace('/')
        return
      }
      if (access.status === 'unavailable') {
        setError('Access verification is temporarily unavailable. Please retry shortly.')
        setCheckingSession(false)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (!active) return
      if (session) {
        router.replace('/unauthorized')
        return
      }
      setCheckingSession(false)
    }

    void checkSession()

    return () => {
      active = false
    }
  }, [router])

  async function handleGoogleSignIn() {
    setError(null)
    setLoading('google')

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(null)
    }
  }

  async function handleBrandSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading('brand')
    try {
      const response = await fetch('/api/auth/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        cache: 'no-store',
      })
      setPassword('')
      if (!response.ok) {
        setError(response.status === 401 || response.status === 429 ? 'Incorrect access password.' : 'Brand Access is temporarily unavailable.')
        setLoading(null)
        return
      }
      router.replace('/')
    } catch {
      setPassword('')
      setError('Brand Access is temporarily unavailable.')
      setLoading(null)
    }
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-[#dce6f5]">
        <div className="text-sm text-[#9aaec7]">Checking session…</div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 text-[#dce6f5]">
      <div className="w-full max-w-md rounded-2xl border border-[#1c3048] bg-[#0c1a2b] p-8 shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#3868f4] text-base font-bold italic text-white">S</span>
          <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d84a3]">Private access</p>
              <h1 className="text-2xl font-semibold text-white">{mode === 'brand' ? 'Brand Access' : 'Domain Directory'}</h1>
          </div>
        </div>

        <p className="text-sm text-[#9aaec7]">{mode === 'brand' ? 'Enter the shared access password provided by MarketingPark.' : 'Choose how you want to access the directory.'}</p>

        {error && (
          <div className="mt-4 rounded-lg border border-[#5c2b39] bg-[#2a1a22] px-3 py-2 text-sm text-[#ffb4c1]">
            {error}
          </div>
        )}

        {mode === 'choices' ? <>
          <button type="button" onClick={handleGoogleSignIn} disabled={loading !== null} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3964f4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4b73ff] disabled:cursor-not-allowed disabled:opacity-60">{loading === 'google' ? 'Redirecting...' : 'Continue with Google'}</button>
          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-[#667e9d]"><span className="h-px flex-1 bg-[#203750]" />or<span className="h-px flex-1 bg-[#203750]" /></div>
          <button type="button" onClick={() => { setError(null); setMode('brand') }} className="inline-flex w-full items-center justify-center rounded-lg border border-[#294563] bg-[#12263d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#16314f]">Brand Access</button>
        </> : <form onSubmit={handleBrandSignIn}>
          <label htmlFor="brand-password" className="mt-6 block text-xs font-semibold text-[#b8c9dc]">Password</label>
          <input id="brand-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 text-sm text-white outline-none focus:border-[#6689ff]" />
          <button type="submit" disabled={loading !== null || !password} className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#3964f4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4b73ff] disabled:cursor-not-allowed disabled:opacity-60">{loading === 'brand' ? 'Checking...' : 'Access Directory'}</button>
          <button type="button" onClick={() => { setPassword(''); setError(null); setMode('choices') }} disabled={loading !== null} className="mt-3 w-full py-2 text-sm font-medium text-[#9fb4d0] hover:text-white">Back</button>
        </form>}
      </div>
    </main>
  )
}
