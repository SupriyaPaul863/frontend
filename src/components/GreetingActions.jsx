import React from 'react'
import { FaUserPlus, FaLightbulb, FaChartBar, FaPlus } from 'react-icons/fa'

const ActionCard = ({ title, subtitle, icon: Icon, accent }) => (
  <div className="action-card" style={{ borderColor: accent }}>
    <div className="action-header">
      <span className="action-icon" style={{ background: '#eaf2ff', color: '#1677ff' }}>
        <Icon />
      </span>
      <button className="action-add"><FaPlus /></button>
    </div>
    <div className="action-title">{title}</div>
    <div className="action-sub">{subtitle}</div>
  </div>
)

export default function GreetingActions({ userName }) {
  const now = new Date()
  const formatted = now.toLocaleString()
  return (
    <section className="greet-actions">
      <div className="greet-col greet-left">
        <div className="greet-title">👋 Hi, {userName}</div>
        <div className="greet-sub">Good Morning !</div>
        <div className="greet-desc">Hope you have a great start to the day.</div>
        <button className="greet-time">{formatted}</button>
      </div>
      <div className="greet-col greet-right">
        <ActionCard
          title="Create your first Contact"
          subtitle="Get started by adding your very first contact! Building your network"
          icon={FaUserPlus}
          accent="#1677ff"
        />
        <ActionCard
          title="Create your new Opportunity"
          subtitle="Add an opportunity and see how easy it is to track stages."
          icon={FaLightbulb}
          accent="#f5a623"
        />
        <ActionCard
          title="Create your first Activity"
          subtitle="Add an Activity and see how easy it is to track stages."
          icon={FaChartBar}
          accent="#2ccac6"
        />
      </div>
    </section>
  )
}


