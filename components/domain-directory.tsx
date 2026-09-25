'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Database,
  Globe2,
  Layers3,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import CsvImportDialog from '@/components/csv-import-dialog'
import type { ManagedDomain } from '@/lib/csv-import'
import { publicSupabase, supabase } from '@/lib/supabase/client'

export type Domain = {
  id: number | string
  name: string
  owner: string
  segment: string
  tld: string
}

type SupabaseDomain = {
  id: number | string
  domain: string
  brand: string | null
  manager: string | null
  source: string | null
}

const domainBatchSize = 1000
const pageSizeOptions = [10, 25, 50]

function formatCount(value: number) {
  return value.toLocaleString('en-US')
}

export function DomainDirectory() {
  const router = useRouter()
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<'All' | 'Our team' | 'Aphex Media'>('All')
  const [segment, setSegment] = useState('All')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [openMenu, setOpenMenu] = useState<number | string | null>(null)
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null)
  const [removingDomain, setRemovingDomain] = useState<Domain | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')
  const [newDomain, setNewDomain] = useState('')
  const [newOwner, setNewOwner] = useState('Our team')
  const [newSegment, setNewSegment] = useState('Unassigned')
  const [newSource, setNewSource] = useState('internal')
  const [importing, setImporting] = useState(false)

  async function loadDomains() {
    setLoading(true)
    setError(null)
    const records: SupabaseDomain[] = []
    let offset = 0

    while (true) {
      const { data, error: requestError } = await publicSupabase
        .from('domains')
        .select('*')
        .order('domain', { ascending: true })
        .range(offset, offset + domainBatchSize - 1)

      if (requestError) {
        setError(requestError.message)
        setLoading(false)
        return
      }

      const batch = (data ?? []) as SupabaseDomain[]
      records.push(...batch)
      if (batch.length < domainBatchSize) break
      offset += batch.length
    }

    setDomains(records.map((record) => ({
      id: record.id,
      name: record.domain,
      owner: record.manager ?? 'Unassigned',
      segment: record.brand ?? 'Unassigned',
      tld: record.source ?? 'Unassigned',
    })))
    setLoading(false)
  }

  useEffect(() => {
    void loadDomains()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [query, scope, segment, pageSize])

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest('[data-domain-menu]')) setOpenMenu(null)
    }
    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [])

  const segmentFilters = useMemo((): Array<readonly [string, number]> => {
    const segmentNames = Array.from(new Set(domains.map((domain) => domain.segment))).sort()
    return [
      ['All', domains.length],
      ...segmentNames.map((name): readonly [string, number] => [name, domains.filter((domain) => domain.segment === name).length]),
    ]
  }, [domains])

  const filteredDomains = useMemo(() => domains.filter((domain) => {
    const matchesQuery = domain.name.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (scope === 'All' || domain.owner === scope) && (segment === 'All' || domain.segment === segment)
  }), [domains, query, scope, segment])

  const totalPages = Math.max(1, Math.ceil(filteredDomains.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageDomains = filteredDomains.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const firstResult = filteredDomains.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const lastResult = Math.min(currentPage * pageSize, filteredDomains.length)
  const pageNumbers = useMemo(() => {
    const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1, 2, 3])
    return Array.from(pages).filter((number) => number > 0 && number <= totalPages).sort((a, b) => a - b)
  }, [currentPage, totalPages])

  const totalDomains = domains.length
  const teamDomains = domains.filter((domain) => domain.owner === 'Our team').length
  const aphexDomains = domains.filter((domain) => domain.owner === 'Aphex Media').length
  const segments = new Set(domains.map((domain) => domain.segment)).size

  function saveEdit() {
    const value = draft.trim()
    if (!value || !editingDomain) return
    setDomains((current) => current.map((domain) => domain.id === editingDomain.id ? { ...domain, name: value } : domain))
    setEditingDomain(null)
  }

  function addDomain() {
    const value = newDomain.trim()
    if (!value) return
    setDomains((current) => [{ id: Date.now(), name: value, owner: newOwner, segment: newSegment, tld: newSource.trim() || 'internal' }, ...current])
    setNewDomain('')
    setNewOwner('Our team')
    setNewSegment('Unassigned')
    setNewSource('internal')
    setAdding(false)
  }

  function removeDomain() {
    if (!removingDomain) return
    setDomains((current) => current.filter((domain) => domain.id !== removingDomain.id))
    setRemovingDomain(null)
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-[#dce6f5]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[224px] border-r border-[#1c2d43] bg-[#091727] px-4 py-6 lg:flex lg:flex-col">
        <div className="flex items-center gap-2 px-3 text-lg font-bold tracking-tight text-white"><span className="grid size-7 place-items-center rounded-lg bg-[#3868f4] text-xs italic">S</span> SEO-TEAM</div>
        <nav className="mt-10 space-y-1" aria-label="Primary navigation">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem icon={Globe2} label="Domains" active />
          <SidebarItem icon={BarChart3} label="Analytics" />
          <SidebarItem icon={Users} label="Team" />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>
      </aside>

      <main className="min-h-screen lg:pl-[224px]">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-7 lg:px-10 lg:py-7">
          <div className="mb-7 flex items-center gap-3 lg:hidden"><span className="grid size-8 place-items-center rounded-lg bg-[#3868f4] text-xs italic">S</span><span className="font-bold text-white">SEO-TEAM</span><span className="ml-auto text-xs text-[#7188a7]">Operations</span></div>
          <header className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d84a3]">Operations</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[38px]">Domain Directory</h1>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleSignOut} className="inline-flex h-10 items-center rounded-lg border border-[#294563] bg-[#0f2135] px-3 text-sm font-medium text-[#dce6f5] transition hover:bg-[#152d47]">Log out</button>
              <button type="button" onClick={() => setImporting(true)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#3c5d9a] bg-[#102753] px-4 text-sm font-semibold text-[#c9d7ff] transition hover:bg-[#173568] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb0ff]"><UploadIcon /> Import CSV</button>
              <button onClick={() => setAdding(true)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#3964f4] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(49,92,243,0.2)] transition hover:bg-[#4b73ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb0ff]"><Plus className="size-4" /> Add domain</button>
            </div>
          </header>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Domain summary">
            <SummaryCard icon={Database} label="Total domains" value={totalDomains} tone="blue" loading={loading} />
            <SummaryCard icon={Users} label="Our team" value={teamDomains} tone="indigo" loading={loading} />
            <SummaryCard icon={ShieldCheck} label="Aphex Media" value={aphexDomains} tone="orange" loading={loading} />
            <SummaryCard icon={Tag} label="Segments" value={segments} tone="teal" loading={loading} />
          </section>

          <section className="mt-7 rounded-xl border border-[#1c3048] bg-[#0c1a2b] shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
            <div className="flex flex-col gap-4 border-b border-[#1b2c43] p-4 lg:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Owner filters">
                  {(['All', 'Our team', 'Aphex Media'] as const).map((item) => <FilterButton key={item} active={scope === item} onClick={() => setScope(item)} icon={item === 'All' ? Layers3 : item === 'Our team' ? Users : ShieldCheck}>{item}<span>{formatCount(domains.filter((domain) => item === 'All' || domain.owner === item).length)}</span></FilterButton>)}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8aa0bd]"><SlidersHorizontal className="size-3.5" /><span>View</span><select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))} aria-label="Rows per page" className="rounded-md border border-[#273d59] bg-[#102239] px-2 py-1.5 text-xs text-[#c8d5e7] outline-none focus:border-[#6382ed]">{pageSizeOptions.map((option) => <option key={option} value={option}>{option} per page</option>)}</select></div>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Segment filters">
                {segmentFilters.map(([item, count]) => <button key={item} onClick={() => setSegment(item)} className={`rounded-md border px-3 py-1.5 text-xs transition ${segment === item ? 'border-[#6689ff] bg-[#203e86] text-white' : 'border-[#223a57] bg-[#0e2138] text-[#91a6c0] hover:border-[#3d5d87] hover:text-white'}`}>{item} <span className="ml-1 text-[#7892b1]">{formatCount(count)}</span></button>)}
              </div>
            </div>

            <div className="border-b border-[#1b2c43] p-4 lg:p-5">
              <div className="relative max-w-xl"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6f87a5]" /><label htmlFor="domain-search" className="sr-only">Search domains</label><input id="domain-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search domains..." className="h-10 w-full rounded-lg border border-[#263d59] bg-[#0a1727] pl-10 pr-10 text-sm text-white outline-none placeholder:text-[#627995] transition focus:border-[#5f80e9] focus:ring-2 focus:ring-[#315cf3]/20" />{query && <button aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7890ad] hover:text-white"><X className="size-4" /></button>}</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead><tr className="border-b border-[#1b2c43] bg-[#0e1e32] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f86a4]"><th className="w-10 px-5 py-3"><span className="sr-only">Select</span><span className="block size-3 rounded border border-[#58708e]" /></th><th className="px-3 py-3">Domain</th><th className="px-3 py-3">Owner</th><th className="px-3 py-3">Segment</th><th className="px-3 py-3">Registry / Source</th><th className="w-14 px-3 py-3 text-right">Actions</th></tr></thead>
                <tbody>{loading ? <tr><td colSpan={6} className="px-5 py-16 text-center text-sm text-[#7890ad]">Loading domains...</td></tr> : error ? <tr><td colSpan={6} className="px-5 py-16 text-center text-sm text-[#ff9da5]">Unable to load domains: {error}</td></tr> : pageDomains.length === 0 ? <tr><td colSpan={6} className="px-5 py-16 text-center text-sm text-[#7890ad]">No domains match the current search and filters.</td></tr> : pageDomains.map((domain) => <tr key={domain.id} className="border-b border-[#172a40] transition hover:bg-[#102239]">
                  <td className="px-5 py-3.5"><span className="block size-3 rounded border border-[#45617f]" /></td>
                  <td className="px-3 py-3.5"><span className="font-mono text-sm text-[#d9e6f5]">{domain.name}</span></td>
                  <td className="px-3 py-3.5"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${domain.owner === 'Our team' ? 'bg-[#123c72] text-[#83b6ff]' : 'bg-[#3b2b1e] text-[#e8ad69]'}`}>{domain.owner}</span></td>
                  <td className="px-3 py-3.5"><span className="inline-flex items-center gap-2 text-xs text-[#b5c4d8]"><span className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${segmentColor(domain.segment)}`}>{domain.segment.charAt(0)}</span>{domain.segment}</span></td>
                  <td className="px-3 py-3.5"><span className="rounded-md border border-[#29415d] bg-[#102239] px-2 py-1 font-mono text-[11px] text-[#9db0c9]">{domain.tld}</span></td>
                  <td className="relative px-3 py-3.5 text-right" data-domain-menu><button aria-label={`Actions for ${domain.name}`} aria-expanded={openMenu === domain.id} onClick={() => setOpenMenu(openMenu === domain.id ? null : domain.id)} className="rounded-md p-1.5 text-[#7890ad] hover:bg-[#1b3554] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6586f1]"><MoreHorizontal className="size-4" /></button>{openMenu === domain.id && <div className="absolute right-4 top-11 z-10 w-32 rounded-lg border border-[#2a4564] bg-[#102239] p-1 text-left shadow-xl"><button onClick={() => { setEditingDomain(domain); setDraft(domain.name); setOpenMenu(null) }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-[#c4d3e5] hover:bg-[#1a3553]"><PencilIcon /> Edit</button><button onClick={() => { setRemovingDomain(domain); setOpenMenu(null) }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-[#ff9da5] hover:bg-[#3b2029]"><Trash2 className="size-3.5" /> Remove</button></div>}</td>
                </tr>)}</tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 px-5 py-4 text-xs text-[#7890ad] sm:flex-row sm:items-center sm:justify-between"><span>Showing {firstResult}–{lastResult} of {formatCount(filteredDomains.length)} domains</span><div className="flex items-center gap-1"><button aria-label="Previous page" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="grid size-7 place-items-center rounded-md border border-[#263d59] disabled:cursor-not-allowed disabled:opacity-35 hover:bg-[#172e4b]"><ChevronLeft className="size-4" /></button>{pageNumbers.map((number, index) => <span key={number} className="flex items-center">{index > 0 && pageNumbers[index - 1] !== number - 1 && <span className="px-1 text-[#506985]">...</span>}<button aria-label={`Page ${number}`} aria-current={number === currentPage ? 'page' : undefined} onClick={() => setPage(number)} className={`grid size-7 place-items-center rounded-md border text-xs ${number === currentPage ? 'border-[#688cff] bg-[#2648a8] text-white' : 'border-transparent text-[#8da2bd] hover:border-[#304d70] hover:bg-[#172e4b]'}`}>{number}</button></span>)}<button aria-label="Next page" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="grid size-7 place-items-center rounded-md border border-[#263d59] disabled:cursor-not-allowed disabled:opacity-35 hover:bg-[#172e4b]"><ChevronRight className="size-4" /></button></div></div>
          </section>
          <footer className="flex flex-col gap-2 px-1 py-6 text-xs text-[#5e7693] sm:flex-row sm:items-center sm:justify-between"><span>Shared directory · Supabase is the source of truth.</span><span className="inline-flex items-center gap-1.5"><CircleHelp className="size-3.5" /> Internal operations</span></footer>
        </div>
      </main>

      {importing && <CsvImportDialog existing={domains.map((domain): ManagedDomain => ({ id: domain.id, domain: domain.name, brand: domain.segment === 'Unassigned' ? null : domain.segment, manager: domain.owner === 'Unassigned' ? null : domain.owner, source: domain.tld === 'Unassigned' ? null : domain.tld }))} onClose={() => setImporting(false)} onImported={loadDomains} />}
      {adding && <Dialog title="Add domain" onClose={() => setAdding(false)}><p className="text-sm text-[#8197b4]">Add a domain to the local directory view.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><FieldLabel label="Domain name" htmlFor="new-domain" className="sm:col-span-2"><input id="new-domain" autoFocus value={newDomain} onChange={(event) => setNewDomain(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addDomain()} placeholder="example.com" className="mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 font-mono text-sm text-white outline-none focus:border-[#6689ff]" /></FieldLabel><FieldLabel label="Owner" htmlFor="new-owner"><select id="new-owner" value={newOwner} onChange={(event) => setNewOwner(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 text-sm text-white outline-none focus:border-[#6689ff]"><option>Our team</option><option>Aphex Media</option></select></FieldLabel><FieldLabel label="Segment" htmlFor="new-segment"><select id="new-segment" value={newSegment} onChange={(event) => setNewSegment(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 text-sm text-white outline-none focus:border-[#6689ff]"><option>Unassigned</option><option>Betoffice</option><option>Betpipo</option><option>Galabet</option><option>Hitbet</option><option>Padişahbet</option><option>Vippark</option></select></FieldLabel><FieldLabel label="Registry / source" htmlFor="new-source" className="sm:col-span-2"><input id="new-source" value={newSource} onChange={(event) => setNewSource(event.target.value)} placeholder="internal" className="mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 font-mono text-sm text-white outline-none focus:border-[#6689ff]" /></FieldLabel></div><DialogActions onCancel={() => setAdding(false)} onConfirm={addDomain} confirmLabel="Add domain" /></Dialog>}
      {editingDomain && <Dialog title="Edit domain" onClose={() => setEditingDomain(null)}><p className="text-sm text-[#8197b4]">Update the domain name in the current directory view.</p><label className="mt-5 block text-xs font-semibold text-[#b8c9dc]" htmlFor="edit-domain">Domain name</label><input id="edit-domain" autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && saveEdit()} className="mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 font-mono text-sm text-white outline-none focus:border-[#6689ff]" /><DialogActions onCancel={() => setEditingDomain(null)} onConfirm={saveEdit} confirmLabel="Save changes" /></Dialog>}
      {removingDomain && <Dialog title="Remove domain" onClose={() => setRemovingDomain(null)}><p className="text-sm leading-6 text-[#8197b4]">Remove <span className="font-mono text-[#dce6f5]">{removingDomain.name}</span> from the current directory view?</p><DialogActions onCancel={() => setRemovingDomain(null)} onConfirm={removeDomain} confirmLabel="Remove" destructive /></Dialog>}
    </div>
  )
}

function SidebarItem({ icon: Icon, label, active = false }: { icon: typeof Globe2; label: string; active?: boolean }) {
  return <button disabled={!active} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs ${active ? 'bg-[#285bd1] text-white shadow-[0_8px_18px_rgba(39,91,209,0.2)]' : 'cursor-not-allowed text-[#7188a5]'}`}><Icon className="size-4" />{label}</button>
}

function SummaryCard({ icon: Icon, label, value, tone, loading }: { icon: typeof Database; label: string; value: number; tone: 'blue' | 'indigo' | 'orange' | 'teal'; loading: boolean }) {
  const tones = { blue: 'border-[#16485a] bg-[#0d2935] text-[#4cc7db]', indigo: 'border-[#273e78] bg-[#121e3b] text-[#718aff]', orange: 'border-[#5a3e2b] bg-[#241c1b] text-[#e78b35]', teal: 'border-[#15505a] bg-[#0e2930] text-[#31c4bd]' }
  return <div className={`rounded-xl border p-4 ${tones[tone]}`}><div className="flex items-center justify-between"><span className="grid size-8 place-items-center rounded-full bg-current/15"><Icon className="size-4" /></span></div><div className="mt-3 font-mono text-2xl font-semibold text-white">{loading ? '...' : formatCount(value)}</div><div className="mt-1 text-xs text-[#9aacc1]">{label}</div></div>
}

function FilterButton({ children, active, onClick, icon: Icon }: { children: React.ReactNode; active: boolean; onClick: () => void; icon: typeof Layers3 }) {
  return <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition ${active ? 'border-[#7395ff] bg-[#dce8ff] text-[#162b5f]' : 'border-[#203853] bg-[#0e2138] text-[#a6b8cd] hover:border-[#42628b] hover:text-white'}`}><Icon className="size-3.5" />{children}</button>
}

function segmentColor(segment: string) {
  const colors = ['bg-[#1f66bb] text-white', 'bg-[#2e62c2] text-white', 'bg-[#7147c8] text-white', 'bg-[#d3911c] text-white', 'bg-[#d63d57] text-white', 'bg-[#26a99b] text-white']
  return colors[segment.length % colors.length]
}

function PencilIcon() {
  return <span className="size-3.5 text-center text-[11px]">✎</span>
}

function UploadIcon() {
  return <span className="text-sm">↑</span>
}

function Dialog({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#020914]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div className="w-full max-w-md rounded-xl border border-[#294563] bg-[#0d1d31] p-5 shadow-2xl"><div className="flex items-center justify-between"><h2 id="dialog-title" className="text-lg font-semibold text-white">{title}</h2><button aria-label="Close dialog" onClick={onClose} className="rounded-md p-1 text-[#7890ad] hover:bg-[#1a3553] hover:text-white"><X className="size-4" /></button></div>{children}</div></div>
}

function FieldLabel({ label, htmlFor, className = '', children }: { label: string; htmlFor: string; className?: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} className={`block text-xs font-semibold text-[#b8c9dc] ${className}`}>{label}{children}</label>
}

function DialogActions({ onCancel, onConfirm, confirmLabel, destructive = false }: { onCancel: () => void; onConfirm: () => void; confirmLabel: string; destructive?: boolean }) {
  return <div className="mt-6 flex justify-end gap-2"><button onClick={onCancel} className="rounded-md border border-[#294563] px-3 py-2 text-xs font-medium text-[#a9bad0] hover:bg-[#152b47]">Cancel</button><button onClick={onConfirm} className={`rounded-md px-3 py-2 text-xs font-semibold text-white ${destructive ? 'bg-[#a83f50] hover:bg-[#c24c5d]' : 'bg-[#3964f4] hover:bg-[#4b73ff]'}`}>{confirmLabel}</button></div>
}

export default DomainDirectory
