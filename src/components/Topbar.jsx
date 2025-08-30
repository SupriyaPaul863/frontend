import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

export default function Topbar() {
  return (
    <div className="topbar">
      <div />
      <div className="topbar-right">
        <button className="location-btn">Asia/Qatar</button>
        <button className="profile-btn" aria-label="Profile">
          <FaUserCircle size={24} />
        </button>
      </div>
    </div>
  )
}


