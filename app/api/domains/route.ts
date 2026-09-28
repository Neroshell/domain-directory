import { NextResponse } from 'next/server'
import { getDirectoryAccess, isSameOriginRequest } from '@/lib/auth/directory-access'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'
const batchSize = 1000

async function requireInternal(request: Request) {
  const access = await getDirectoryAccess(request)
  return access?.accessType === 'internal' ? access : null
}

export async function GET(request: Request) {
  try {
    const access = await getDirectoryAccess(request)
    if (!access) return NextResponse.json({ error: 'Directory access is required.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })

    const url = new URL(request.url)
    const offset = parseBoundedInteger(url.searchParams.get('offset'), 0, 0, 1000000)
    const limit = parseBoundedInteger(url.searchParams.get('limit'), batchSize, 1, batchSize)
    const { data, error } = await createSupabaseAdminClient()
      .from('domains')
      .select('id, domain, brand, manager, source')
      .order('domain')
      .range(offset, offset + limit - 1)
    if (error) return NextResponse.json({ error: 'Domain data could not be loaded.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } })
    return NextResponse.json({ domains: data ?? [], accessType: access.accessType }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Domain data could not be loaded.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Request could not be verified.' }, { status: 403 })
  try {
    if (!await requireInternal(request)) return NextResponse.json({ error: 'Internal access is required for this operation.' }, { status: 403 })
    const body = await request.json() as { domain?: unknown; brand?: unknown; manager?: unknown; source?: unknown }
    if (typeof body.domain !== 'string' || !isValidDomain(body.domain)) return NextResponse.json({ error: 'Enter a valid domain.' }, { status: 400 })
    const { data, error } = await createSupabaseAdminClient().from('domains').insert({
      domain: normalizeDomain(body.domain),
      brand: cleanNullableString(body.brand),
      manager: cleanNullableString(body.manager),
      source: cleanNullableString(body.source),
    }).select('id, domain, brand, manager, source').single()
    if (error) return NextResponse.json({ error: 'The domain could not be added. It may already exist.' }, { status: 400 })
    return NextResponse.json({ domain: data }, { status: 201, headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'The domain could not be added.' }, { status: 503 })
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Request could not be verified.' }, { status: 403 })
  try {
    if (!await requireInternal(request)) return NextResponse.json({ error: 'Internal access is required for this operation.' }, { status: 403 })
    const body = await request.json() as { id?: unknown; domain?: unknown }
    if ((typeof body.id !== 'string' && typeof body.id !== 'number') || typeof body.domain !== 'string' || !isValidDomain(body.domain)) {
      return NextResponse.json({ error: 'Enter a valid domain.' }, { status: 400 })
    }
    const { error } = await createSupabaseAdminClient().from('domains').update({ domain: normalizeDomain(body.domain) }).eq('id', body.id)
    if (error) return NextResponse.json({ error: 'The domain could not be updated.' }, { status: 400 })
    return NextResponse.json({ updated: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'The domain could not be updated.' }, { status: 503 })
  }
}

export async function DELETE(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Request could not be verified.' }, { status: 403 })
  try {
    if (!await requireInternal(request)) return NextResponse.json({ error: 'Internal access is required for this operation.' }, { status: 403 })
    const body = await request.json() as { id?: unknown }
    if (typeof body.id !== 'string' && typeof body.id !== 'number') return NextResponse.json({ error: 'A domain record is required.' }, { status: 400 })
    const { error } = await createSupabaseAdminClient().from('domains').delete().eq('id', body.id)
    if (error) return NextResponse.json({ error: 'The domain could not be removed.' }, { status: 400 })
    return NextResponse.json({ deleted: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'The domain could not be removed.' }, { status: 503 })
  }
}

function cleanNullableString(value: unknown) {
  if (typeof value !== 'string') return null
  const cleanValue = value.trim()
  return cleanValue || null
}

function isValidDomain(value: string) {
  const domain = normalizeDomain(value)
  if (!domain || domain.length > 253 || /\s|[/?#]/.test(domain)) return false
  const labels = domain.split('.')
  return labels.length > 1 && labels.every((label) => label.length > 0 && label.length <= 63 && !label.startsWith('-') && !label.endsWith('-'))
}

function normalizeDomain(value: string) {
  return value.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '').toLowerCase()
}

function parseBoundedInteger(value: string | null, fallback: number, minimum: number, maximum: number) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed >= minimum && parsed <= maximum ? parsed : fallback
}