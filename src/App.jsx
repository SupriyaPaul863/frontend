import React, { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import StatsRow from './components/StatsRow.jsx'
import GreetingActions from './components/GreetingActions.jsx'
import ChartPanel from './components/ChartPanel.jsx'
import ContactsTable from './components/ContactsTable.jsx'

export default function App() {
  const [timeframe, setTimeframe] = useState('Last Week')

  return (
    <div className="app-root">
      <Sidebar />
      <div className="app-content">
        <Topbar />
        <StatsRow />
        <GreetingActions userName="Divya Senapati" />
        <div className="main-panels">
          <ChartPanel timeframe={timeframe} onTimeframeChange={setTimeframe} />
          <ContactsTable />
        </div>
      </div>
    </div>
  )
}


