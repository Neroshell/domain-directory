import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/logout-button'

export default async function UnauthorizedPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !session?.user) {
    redirect('/login')
  }

  const normalizedEmail = session.user.email?.trim().toLowerCase()
  if (!normalizedEmail) {
    redirect('/login')
  }

  const { data: allowedUser } = await supabase
    .from('allowed_users')
    .select('email')
    .ilike('email', normalizedEmail)
    .maybeSingle()

  if (allowedUser) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 text-[#dce6f5]">
      <div className="w-full max-w-md rounded-2xl border border-[#2a3d57] bg-[#0d1b2d] p-8 text-center shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-[#2d1a22] text-2xl">⛔</div>
        <h1 className="text-2xl font-semibold text-white">Access denied</h1>
        <p className="mt-3 text-sm leading-6 text-[#9aaec7]">
          Your Google account is signed in, but it is not approved for this directory.
        </p>
        <LogoutButton />
      </div>
    </main>
  )
}
