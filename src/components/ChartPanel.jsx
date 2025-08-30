import React, { useEffect, useMemo, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

function getLastWeekRange() {
  const now = new Date()
  const day = now.getDay() // 0 Sun - 6 Sat
  const diffToMondayThisWeek = (day === 0 ? -6 : 1) - day
  const mondayThisWeek = new Date(now)
  mondayThisWeek.setHours(0,0,0,0)
  mondayThisWeek.setDate(now.getDate() + diffToMondayThisWeek)
  const mondayLastWeek = new Date(mondayThisWeek)
  mondayLastWeek.setDate(mondayThisWeek.getDate() - 7)
  const sundayLastWeek = new Date(mondayLastWeek)
  sundayLastWeek.setDate(mondayLastWeek.getDate() + 6)
  sundayLastWeek.setHours(23,59,59,999)
  return { start: mondayLastWeek, end: sundayLastWeek }
}

function aggregateByDay(items, range) {
  const counts = Array(7).fill(0)
  for (const item of items) {
    const ts = item.created_at || item.createdAt
    if (!ts) continue
    const d = new Date(ts)
    if (Number.isNaN(d.getTime())) continue
    if (d >= range.start && d <= range.end) {
      const jsDay = d.getDay() // 0 Sun - 6 Sat
      const idx = jsDay === 0 ? 6 : jsDay - 1 // Mon=0 .. Sun=6
      counts[idx] += 1
    }
  }
  return DAYS.map((name, i) => ({ name, value: counts[i] }))
}

export default function ChartPanel() {
  const [data, setData] = useState(() => DAYS.map(n => ({ name: n, value: 0 })))

  function parseDataset(text) {
    const normalize = (s) => s.replace(/ISODate\('/g, '"').replace(/'\)/g, '"')
    const raw = normalize(text.trim())
    try {
      return JSON.parse(raw)
    } catch {
      const objs = []
      raw.split(/\n/).forEach(line => {
        const x = line.trim().replace(/^\[|\]$/g, '').replace(/,$/, '')
        if (!x) return
        if (x.startsWith('{') && x.endsWith('}')) {
          try { objs.push(JSON.parse(x)) } catch {}
        }
      })
      return objs
    }
  }

  useEffect(() => {
    fetch('/data_set.txt')
      .then(r => r.text())
      .then(t => {
        const json = parseDataset(t)
        const range = getLastWeekRange()
        setData(aggregateByDay(json, range))
      })
      .catch(() => {
        // keep zeros if fetch fails
      })
  }, [])
  return (
    <section className="panel chart-panel">
      <div className="panel-header">
        <div className="panel-title">Contact</div>
        <div className="panel-controls">Last Week</div>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1677ff" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#1677ff" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#1677ff" fillOpacity={1} fill="url(#colorBlue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}


