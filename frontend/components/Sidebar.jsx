import React from 'react'

export default function Sidebar() {
  return (
    <aside style={{width: 240, padding: '1rem', borderRight: '1px solid #eee'}}>
      <ul style={{listStyle: 'none', padding: 0}}>
        <li>Dashboard</li>
        <li>Patients</li>
        <li>Reports</li>
      </ul>
    </aside>
  )
}
