import { NextResponse } from 'next/server'
import { getDirectoryAccess, isSameOriginRequest } from '@/lib/auth/directory-access'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

type ImportRow = { domain: string; brand: string | null; manager: string | null }

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Request could not be verified.' }, { status: 403 })

  try {
    const access = await getDirectoryAccess(request)
    if (access?.accessType !== 'internal') return NextResponse.json({ error: 'Internal access is required for CSV imports.' }, { status: 403 })

    const body = await request.json() as { rows?: unknown }
    if (!Array.isArray(body.rows) || body.rows.length > 10000) return NextResponse.json({ error: 'The import must contain no more than 10,000 validated rows.' }, { status: 400 })
    const rows: ImportRow[] = []
    const seen = new Set<string>()

    for (const candidate of body.rows) {
      if (!candidate || typeof candidate !== 'object') return NextResponse.json({ error: 'The import contains an invalid row.' }, { status: 400 })
      const row = candidate as Record<string, unknown>
      if (typeof row.domain !== 'string' || !isValidDomain(row.domain)) return NextResponse.json({ error: 'The import contains an invalid domain.' }, { status: 400 })
      const domain = row.domain.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '').toLowerCase()
      if (seen.has(domain)) return NextResponse.json({ error: 'The import contains duplicate domains. Review the preview and remove duplicates.' }, { status: 400 })
      seen.add(domain)
      rows.push({ domain, brand: cleanString(row.brand), manager: cleanString(row.manager) })
    }

    const { data, error } = await createSupabaseAdminClient().rpc('import_domains', { p_rows: rows })
    if (error) return NextResponse.json({ error: 'The import was not completed. No rows were committed; check the database migration and retry.' }, { status: 502 })
    return NextResponse.json({ result: data }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'The import was not completed. No rows were committed; check the connection and retry.' }, { status: 503 })
  }
}

function cleanString(value: unknown) {
  if (typeof value !== 'string') return null
  return value.trim() || null
}

function isValidDomain(value: string) {
  const domain = value.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '').toLowerCase()
  if (!domain || domain.length > 253 || /\s|[/?#]/.test(domain)) return false
  const labels = domain.split('.')
  return labels.length > 1 && labels.every((label) => label.length > 0 && label.length <= 63 && !label.startsWith('-') && !label.endsWith('-'))
}