import React, { useState } from 'react'
import { FaHandSparkles, FaTachometerAlt, FaUserFriends, FaChartBar, FaBuilding, FaUsersCog, FaLightbulb, FaDollarSign, FaFileAlt, FaChevronDown } from 'react-icons/fa'

const NavItem = ({ icon: Icon, label, hasDropdown }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`nav-item ${open ? 'open' : ''}`}>
      <button className="nav-button" onClick={() => hasDropdown && setOpen(v => !v)}>
        <span className="nav-icon"><Icon /></span>
        <span className="nav-label">{label}</span>
        {hasDropdown && <FaChevronDown className={`chev ${open ? 'rot' : ''}`} />}
      </button>
      {hasDropdown && open && (
        <div className="nav-submenu">
          <button>Sub item 1</button>
          <button>Sub item 2</button>
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">EA2Z<span className="thin"> Quote</span></div>
      <nav>
        <NavItem icon={FaHandSparkles} label="Welcome" />
        <NavItem icon={FaTachometerAlt} label="Dashboard" hasDropdown />
        <NavItem icon={FaUserFriends} label="Contact" />
        <NavItem icon={FaChartBar} label="Activity" />
        <NavItem icon={FaBuilding} label="Company" />
        <NavItem icon={FaUsersCog} label="Group" />
        <NavItem icon={FaLightbulb} label="Opportunity" />
        <NavItem icon={FaDollarSign} label="Subscription" />
        <NavItem icon={FaFileAlt} label="Reports" hasDropdown />
      </nav>
      <div className="sidebar-bottom">
        <div className="plan-box">
          <div className="plan-title">Current Plan:</div>
          <div className="plan-name">Pro Trial</div>
          <div className="plan-desc">Upgrade to get latest and exclusive features</div>
        </div>
        <button className="upgrade-btn">⚡ Upgrade to Pro</button>
      </div>
    </aside>
  )
}


