import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface ResponsiveTableProps {
  columns: Column[]
  data: any[]
  rowKey?: string
}

export default function ResponsiveTable({ columns, data, rowKey = 'id' }: ResponsiveTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (key: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/[0.08]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.08]">
            {data.map((row, idx) => (
              <tr key={row[rowKey] || idx} className="hover:bg-white/[0.05] transition-colors">
                {columns.map((col) => (
                  <td key={`${row[rowKey]}-${col.key}`} className="px-6 py-4">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {data.map((row, idx) => {
          const rowId = String(row[rowKey] || idx)
          const isExpanded = expandedRows.has(rowId)

          return (
            <div
              key={rowId}
              className="glossy-card rounded-xl overflow-hidden border border-white/[0.08]"
            >
              {/* Card Header - Always Visible */}
              <div
                className="p-4 cursor-pointer flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                onClick={() => toggleRow(rowId)}
              >
                <div className="flex-1">
                  {/* Show first two columns in header */}
                  {columns.slice(0, 2).map((col, colIdx) => (
                    <div key={col.key} className={colIdx === 0 ? 'mb-1' : ''}>
                      {colIdx === 0 ? (
                        <p className="text-sm font-bold text-text-primary">
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </p>
                      ) : (
                        <p className="text-xs text-text-secondary">
                          <span className="font-semibold">{col.label}:</span>{' '}
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="ml-2 flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-accent-blue" />
                  ) : (
                    <ChevronDown size={20} className="text-text-secondary" />
                  )}
                </div>
              </div>

              {/* Card Body - Expanded Details */}
              {isExpanded && (
                <div className="border-t border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                  {columns.slice(2).map((col) => (
                    <div key={col.key} className="flex justify-between items-start gap-2">
                      <span className="text-xs font-semibold text-text-secondary uppercase">
                        {col.label}
                      </span>
                      <span className="text-sm font-semibold text-text-primary text-right">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
