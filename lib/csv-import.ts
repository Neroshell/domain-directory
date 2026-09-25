import Papa from 'papaparse'

export type ManagedDomain = {
  id: number | string
  domain: string
  brand: string | null
  manager: string | null
  source: string | null
}

export type ImportRecord = {
  rowNumber: number
  domain: string
  brand: string | null
  manager: string | null
  source: string | null
}

export type ImportChange = {
  field: 'domain' | 'brand' | 'manager' | 'source'
  label: string
  from: string
  to: string
}

export type ImportItem = {
  rowNumber: number
  record: ImportRecord | null
  status: 'new' | 'changed' | 'unchanged' | 'duplicate' | 'invalid'
  message?: string
  changes: ImportChange[]
}

export type ImportSummary = {
  items: ImportItem[]
  newItems: ImportItem[]
  changedItems: ImportItem[]
  unchangedItems: ImportItem[]
  duplicateItems: ImportItem[]
  invalidItems: ImportItem[]
}

const supportedHeaders = new Set(['domain', 'brand', 'manager', 'source'])
const requiredHeaders = ['domain']

export function normalizeDomain(value: string) {
  return value.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '').toLowerCase()
}

function isValidDomain(value: string) {
  if (!value || value.length > 253 || /\s|[/?#]/.test(value)) return false
  const labels = value.split('.')
  return labels.length >= 2 && labels.every((label) => label.length > 0 && label.length <= 63 && !label.startsWith('-') && !label.endsWith('-'))
}

function normalizeHeader(value: string) {
  return value.replace(/^\uFEFF/, '').trim().toLowerCase()
}

function normalizeField(value: unknown) {
  const normalized = String(value ?? '').trim()
  return normalized || null
}

function displayValue(value: string | null) {
  return value ?? 'empty'
}

function compareRecord(record: ImportRecord, existing: ManagedDomain) {
  const changes: ImportChange[] = []
  const fields: Array<ImportChange['field']> = ['domain', 'brand', 'manager', 'source']
  const labels: Record<ImportChange['field'], string> = { domain: 'domain', brand: 'brand', manager: 'manager', source: 'source' }

  for (const field of fields) {
    const current = field === 'domain' ? normalizeDomain(existing.domain) : normalizeField(existing[field])
    const incoming = field === 'domain' ? record.domain : record[field]
    if (current !== incoming) changes.push({ field, label: labels[field], from: displayValue(current), to: displayValue(incoming) })
  }

  return changes
}

export function parseAndClassifyCsv(file: File, existing: ManagedDomain[]): Promise<ImportSummary> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: normalizeHeader,
      complete: (results) => {
        const headers = results.meta.fields ?? []
        const unsupportedHeaders = headers.filter((header) => !supportedHeaders.has(header))
        const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header))
        if (missingHeaders.length || unsupportedHeaders.length || results.errors.length) {
          const details = [
            missingHeaders.length ? `Missing required column: ${missingHeaders.join(', ')}` : '',
            unsupportedHeaders.length ? `Unsupported column: ${unsupportedHeaders.join(', ')}` : '',
            results.errors.length ? `CSV parsing error on row ${results.errors[0].row + 2}` : '',
          ].filter(Boolean).join('. ')
          reject(new Error(details || 'The CSV structure is invalid.'))
          return
        }

        if (!results.data.length) {
          reject(new Error('The CSV file is empty.'))
          return
        }

        const existingByDomain = new Map(existing.map((record) => [normalizeDomain(record.domain), record]))
        const seen = new Set<string>()
        const items: ImportItem[] = []

        results.data.forEach((row, index) => {
          const rowNumber = index + 2
          const domain = normalizeDomain(String(row.domain ?? ''))
          const record: ImportRecord = {
            rowNumber,
            domain,
            brand: normalizeField(row.brand),
            manager: normalizeField(row.manager),
            source: normalizeField(row.source),
          }

          if (!isValidDomain(domain)) {
            items.push({ rowNumber, record, status: 'invalid', message: 'Domain is missing or malformed.', changes: [] })
            return
          }

          if (seen.has(domain)) {
            items.push({ rowNumber, record, status: 'duplicate', message: 'The same domain appears more than once in this CSV.', changes: [] })
            return
          }
          seen.add(domain)

          const existingRecord = existingByDomain.get(domain)
          if (!existingRecord) {
            items.push({ rowNumber, record, status: 'new', changes: [] })
            return
          }

          const changes = compareRecord(record, existingRecord)
          items.push({ rowNumber, record, status: changes.length ? 'changed' : 'unchanged', changes })
        })

        resolve({
          items,
          newItems: items.filter((item) => item.status === 'new'),
          changedItems: items.filter((item) => item.status === 'changed'),
          unchangedItems: items.filter((item) => item.status === 'unchanged'),
          duplicateItems: items.filter((item) => item.status === 'duplicate'),
          invalidItems: items.filter((item) => item.status === 'invalid'),
        })
      },
      error: (error) => reject(new Error(`Could not read the CSV file: ${error.message}`)),
    })
  })
}