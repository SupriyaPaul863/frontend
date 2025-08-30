import React, { useEffect, useMemo, useState } from 'react'

function parseDataset(text) {
  try {
    const trimmed = text.trim()
    const lines = trimmed.startsWith('[') ? JSON.parse(trimmed.replace(/ISODate\('/g, '"').replace(/'\)/g, '"')) :
      `[${trimmed.replace(/^\[|\]$/g, '')}]`
    if (typeof lines === 'string') {
      return JSON.parse(lines.replace(/ISODate\('/g, '"').replace(/'\)/g, '"'))
    }
    return lines
  } catch (e) {
    const items = text.split('\n').map(l => l.trim()).filter(Boolean)
    return items.map(l => {
      try { return JSON.parse(l.replace(/,$/, '').replace(/ISODate\('/g, '"').replace(/'\)/g, '"')) } catch { return null }
    }).filter(Boolean)
  }
}

export default function ContactsTable() {
  const [rows, setRows] = useState([])
  const [q, setQ] = useState('')
  const [selectedDate, setSelectedDate] = useState('') // YYYY-MM-DD

  useEffect(() => {
    fetch('/data_set.txt').then(r => r.text()).then(t => setRows(parseDataset(t)))
  }, [])

  const filtered = useMemo(() => {
    const query = q.toLowerCase()
    return rows.filter(r => {
      const created = (r.created_at || '').toString()
      const dateKey = created.slice(0, 10) // YYYY-MM-DD
      const matchesQuery = (
        (r.first_name || '').toLowerCase().includes(query) ||
        (r.email || '').toLowerCase().includes(query) ||
        (r.company || '').toLowerCase().includes(query)
      )
      const matchesDate = selectedDate ? dateKey === selectedDate : true
      return matchesQuery && matchesDate
    })
  }, [rows, q, selectedDate])

  return (
    <section className="panel table-panel">
      <div className="panel-header">
        <div className="panel-title with-icon">All Contacts</div>
        <div className="panel-controls row">
          <input
            type="date"
            className="date-input"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
          <input
            className="search-input"
            placeholder="Search"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr key={idx}>
                <td>{r.first_name}</td>
                <td>{r.company}</td>
                <td>{r.email}</td>
                <td>{(r.created_at || '').toString().replace('ISODate', '').replace(/[()']/g, '')}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}


