'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DomainDirectory from '@/components/domain-directory'
import { supabase } from '@/lib/supabase/client'

export default function Page() {
  const router = useRouter()
  const [sessionReady, setSessionReady] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    let active = true

    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!active) return

      if (!session) {
        router.replace('/login')
        return
      }

      setHasSession(true)
      setSessionReady(true)
    }

    checkSession()

    return () => {
      active = false
    }
  }, [router])

  if (!sessionReady && !hasSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111f] text-[#dce6f5]">
        <div className="text-sm text-[#9aaec7]">Loading…</div>
      </main>
    )
  }

  return <DomainDirectory />
}
