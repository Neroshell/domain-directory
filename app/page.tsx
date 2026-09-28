'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DomainDirectory from '@/components/domain-directory'
import { supabase } from '@/lib/supabase/client'
import { requestDirectoryAccess } from '@/lib/auth/client'

export default function Page() {
  const router = useRouter()
  const [accessType, setAccessType] = useState<'internal' | 'brand' | null>(null)
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [accessUnavailable, setAccessUnavailable] = useState(false)

  useEffect(() => {
    let active = true

    async function checkAccess() {
      const access = await requestDirectoryAccess()
      if (!active) return
      if (access.status === 'unavailable') {
        setAccessType(null)
        setAccessUnavailable(true)
        setCheckingAccess(false)
        return
      }
      if (access.status === 'denied') {
        setAccessType(null)
        setCheckingAccess(false)
        const { data: { session } } = await supabase.auth.getSession()
        router.replace(session ? '/unauthorized' : '/login')
        return
      }
      setAccessUnavailable(false)
      setAccessType(access.accessType)
      setCheckingAccess(false)
    }

    void checkAccess()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setAccessType(null)
        router.replace('/login')
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        void checkAccess()
      }
    })

    function revalidateWhenVisible() {
      if (document.visibilityState === 'visible') void checkAccess()
    }
    document.addEventListener('visibilitychange', revalidateWhenVisible)
    const accessCheckInterval = window.setInterval(() => void checkAccess(), 60_000)

    return () => {
      active = false
      subscription.unsubscribe()
      document.removeEventListener('visibilitychange', revalidateWhenVisible)
      window.clearInterval(accessCheckInterval)
    }
  }, [router])

  if (checkingAccess || !accessType) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-[#dce6f5]">
        <div className="text-center text-sm text-[#9aaec7]">{checkingAccess ? 'Verifying access…' : accessUnavailable ? <><p>Access verification is temporarily unavailable.</p><button type="button" onClick={() => { setCheckingAccess(true); void requestDirectoryAccess().then((access) => { if (access.status === 'authorized') { setAccessType(access.accessType); setAccessUnavailable(false) } else if (access.status === 'denied') router.replace('/login'); else { setAccessUnavailable(true); setCheckingAccess(false) } }) }} className="mt-3 text-[#9bb0ff] hover:text-white">Retry</button></> : 'Redirecting…'}</div>
      </main>
    )
  }

  return <DomainDirectory accessType={accessType} />
}
