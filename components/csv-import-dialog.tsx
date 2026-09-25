'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, FileUp, Upload, X } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { ImportItem, ImportSummary, ManagedDomain, parseAndClassifyCsv } from '@/lib/csv-import'

type CsvImportDialogProps = {
  existing: ManagedDomain[]
  onClose: () => void
  onImported: () => Promise<void>
}

type ImportFilter = 'all' | 'new' | 'changed' | 'unchanged' | 'issues'

const batchSize = 250

export default function CsvImportDialog({ existing, onClose, onImported }: CsvImportDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [summary, setSummary] = useState<ImportSummary | null>(null)
  const [fileName, setFileName] = useState('')
  const [filter, setFilter] = useState<ImportFilter>('all')
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ added: number; updated: number } | null>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return
    setError(null)
    setResult(null)
    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      setError('Please choose a CSV file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('This file is larger than 10 MB. Please split it into smaller CSV files.')
      return
    }

    try {
      setBusy(true)
      setSummary(await parseAndClassifyCsv(file, existing))
      setFileName(file.name)
    } catch (parseError) {
      setSummary(null)
      setFileName('')
      setError(parseError instanceof Error ? parseError.message : 'Could not validate this CSV file.')
    } finally {
      setBusy(false)
    }
  }

  function visibleItems() {
    if (!summary) return []
    if (filter === 'issues') return [...summary.duplicateItems, ...summary.invalidItems]
    if (filter === 'new') return summary.newItems
    if (filter === 'changed') return summary.changedItems
    if (filter === 'unchanged') return summary.unchangedItems
    return summary.items
  }

  async function importChanges() {
    if (!summary) return
    setError(null)
    setBusy(true)
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) throw new Error('Your session has expired. Please sign in again before importing.')

      const existingByDomain = new Map(existing.map((record) => [record.domain, record]))
      const newRows = summary.newItems.flatMap((item) => item.record ? [{ domain: item.record.domain, brand: item.record.brand, manager: item.record.manager, source: item.record.source }] : [])
      const changedRows = summary.changedItems.flatMap((item) => {
        if (!item.record) return []
        const current = existingByDomain.get(item.record.domain)
        return current ? [{ id: current.id, domain: item.record.domain, brand: item.record.brand, manager: item.record.manager, source: item.record.source }] : []
      })

      for (let index = 0; index < newRows.length; index += batchSize) {
        const { error: insertError } = await supabase.from('domains').insert(newRows.slice(index, index + batchSize))
        if (insertError) throw new Error(`Could not add new domains. ${friendlyDatabaseError(insertError.message)}`)
      }
      for (let index = 0; index < changedRows.length; index += batchSize) {
        const updateBatch = changedRows.slice(index, index + batchSize)
        const updateResults = await Promise.all(updateBatch.map(({ id, ...changes }) => supabase.from('domains').update(changes).eq('id', id)))
        const updateError = updateResults.find((result) => result.error)?.error
        if (updateError) throw new Error(`Could not update existing domains. ${friendlyDatabaseError(updateError.message)}`)
      }

      await onImported()
      setResult({ added: newRows.length, updated: changedRows.length })
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : 'The import could not be completed. Some earlier batches may have been written; review the directory before retrying.')
    } finally {
      setBusy(false)
    }
  }

  const tabs: Array<[ImportFilter, string, number]> = summary ? [
    ['all', 'All', summary.items.length],
    ['new', 'New', summary.newItems.length],
    ['changed', 'Changed', summary.changedItems.length],
    ['unchanged', 'Unchanged', summary.unchangedItems.length],
    ['issues', 'Issues', summary.duplicateItems.length + summary.invalidItems.length],
  ] : []

  return <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020914]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="import-dialog-title"><div className="mx-auto my-8 w-full max-w-4xl rounded-xl border border-[#294563] bg-[#0d1d31] p-5 shadow-2xl sm:p-6"><div className="flex items-start justify-between gap-4"><div><h2 id="import-dialog-title" className="text-xl font-semibold text-white">{result ? 'Import complete' : 'Import domains'}</h2><p className="mt-1 text-sm text-[#8197b4]">{result ? 'Your directory has been refreshed with the accepted changes.' : 'Upload a CSV to add new domains or update existing records.'}</p></div><button aria-label="Close import dialog" onClick={onClose} disabled={busy} className="rounded-md p-1 text-[#7890ad] hover:bg-[#1a3553] hover:text-white disabled:opacity-50"><X className="size-5" /></button></div>

    {result ? <div className="mt-8"><div className="grid gap-3 sm:grid-cols-3"><ResultStat label="Added" value={result.added} /><ResultStat label="Updated" value={result.updated} /><ResultStat label="Skipped" value={(summary?.unchangedItems.length ?? 0) + (summary?.duplicateItems.length ?? 0) + (summary?.invalidItems.length ?? 0)} /></div><div className="mt-7 flex justify-end"><button type="button" onClick={onClose} className="rounded-lg bg-[#3964f4] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4b73ff]">Done</button></div></div> : <>
      {!summary && <label onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); void handleFile(event.dataTransfer.files[0]) }} className={`mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 text-center transition ${dragging ? 'border-[#83a0ff] bg-[#172e5b]' : 'border-[#355374] bg-[#0a1727] hover:border-[#6689ff] hover:bg-[#0e2138]'}`}><input ref={inputRef} type="file" accept=".csv,text/csv" className="sr-only" onChange={(event) => void handleFile(event.target.files?.[0])} /><FileUp className="size-8 text-[#6f91e9]" /><span className="mt-3 text-sm font-semibold text-white">Drop your CSV here</span><span className="mt-1 text-xs text-[#8197b4]">or choose a file from your computer</span><span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#294563] bg-[#12263d] px-3 py-2 text-xs font-semibold text-[#dce6f5]"><Upload className="size-3.5" /> Choose CSV</span></label>}
      {fileName && !summary && <p className="mt-3 text-xs text-[#8197b4]">Selected: {fileName}</p>}
      {summary && <><div className="mt-6 grid gap-3 sm:grid-cols-5"><SummaryStat label="Rows found" value={summary.items.length} /><SummaryStat label="New" value={summary.newItems.length} tone="green" /><SummaryStat label="Changed" value={summary.changedItems.length} tone="blue" /><SummaryStat label="Unchanged" value={summary.unchangedItems.length} /><SummaryStat label="Issues" value={summary.duplicateItems.length + summary.invalidItems.length} tone="red" /></div><div className="mt-6 flex flex-wrap gap-2 border-b border-[#1b2c43] pb-4">{tabs.map(([value, label, count]) => <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${filter === value ? 'bg-[#dce8ff] text-[#162b5f]' : 'bg-[#102239] text-[#91a6c0] hover:text-white'}`}>{label} {count}</button>)}</div><div className="mt-4 max-h-80 overflow-y-auto rounded-lg border border-[#1d3550]"><div className="divide-y divide-[#1b2c43]">{visibleItems().slice(0, 250).map((item) => <PreviewItem key={`${item.rowNumber}-${item.status}`} item={item} />)}</div>{visibleItems().length > 250 && <p className="p-3 text-center text-xs text-[#8197b4]">Showing the first 250 rows in this preview.</p>}</div><p className="mt-4 text-sm text-[#b8c9dc]">{summary.newItems.length + summary.changedItems.length} domains will be written. {summary.unchangedItems.length} unchanged records will be skipped.</p><div className="mt-6 flex items-center justify-between gap-3"><button type="button" onClick={() => { setSummary(null); setFileName(''); setError(null) }} className="text-sm font-medium text-[#9fb4d0] hover:text-white">Choose another file</button><div className="flex gap-2"><button type="button" onClick={onClose} className="rounded-lg border border-[#294563] px-4 py-2.5 text-sm font-medium text-[#a9bad0] hover:bg-[#152b47]">Cancel</button><button type="button" onClick={() => void importChanges()} disabled={busy || summary.newItems.length + summary.changedItems.length === 0} className="rounded-lg bg-[#3964f4] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4b73ff] disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Importing...' : 'Import changes'}</button></div></div></>}
      {error && <div className="mt-4 rounded-lg border border-[#5c2b39] bg-[#2a1a22] px-3 py-2 text-sm text-[#ffb4c1]">{error}</div>}
    </>}
  </div></div>
}

function friendlyDatabaseError(message: string) {
  if (/permission|policy|not authorized|row-level security/i.test(message)) return 'Supabase denied this write. An authenticated INSERT/UPDATE policy is required for the domains table; anonymous write access is not used.'
  if (/duplicate|unique/i.test(message)) return 'A duplicate domain was detected by the database. No duplicate record was created.'
  return 'Please check your connection and database permissions.'
}

function SummaryStat({ label, value, tone = 'default' }: { label: string; value: number; tone?: 'default' | 'green' | 'blue' | 'red' }) {
  const colors = { default: 'border-[#294563] bg-[#102239]', green: 'border-[#23604f] bg-[#12382f]', blue: 'border-[#294d8a] bg-[#142c59]', red: 'border-[#633744] bg-[#321d27]' }
  return <div className={`rounded-lg border p-3 ${colors[tone]}`}><div className="font-mono text-xl font-semibold text-white">{value.toLocaleString('en-US')}</div><div className="mt-1 text-xs text-[#9aacc1]">{label}</div></div>
}

function ResultStat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg border border-[#294563] bg-[#102239] p-4 text-center"><CheckCircle2 className="mx-auto size-5 text-[#55c7a6]" /><div className="mt-2 font-mono text-2xl font-semibold text-white">{value.toLocaleString('en-US')}</div><div className="mt-1 text-xs text-[#9aacc1]">{label}</div></div>
}

function PreviewItem({ item }: { item: ImportItem }) {
  const statusStyles = { new: 'text-[#65d3ac]', changed: 'text-[#83a9ff]', unchanged: 'text-[#9aacc1]', duplicate: 'text-[#f1b76a]', invalid: 'text-[#ff9da5]' }
  return <div className="p-3 text-xs"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-[#dce6f5]">{item.record?.domain || `Row ${item.rowNumber}`}</span><span className={`font-semibold uppercase ${statusStyles[item.status]}`}>{item.status}</span></div>{item.message && <p className="mt-1 text-[#ffb4c1]">{item.message}</p>}{item.changes.length > 0 && <div className="mt-2 grid gap-1 text-[#9aacc1] sm:grid-cols-2">{item.changes.map((change) => <span key={change.field}><strong className="text-[#c6d5e7]">{change.label}:</strong> {change.from} → {change.to}</span>)}</div>}</div>
}