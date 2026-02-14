import React from 'react'

export default function DoctorReportCard({report}) {
  return (
    <div style={{border: '1px solid #eee', padding: '1rem'}}>
      <h4>Doctor Report</h4>
      <p>{report || 'No report'}</p>
    </div>
  )
}
