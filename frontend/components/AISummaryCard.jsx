import React from 'react'

export default function AISummaryCard({summary}) {
  return (
    <div style={{border: '1px solid #eee', padding: '1rem'}}>
      <h4>AI Summary</h4>
      <p>{summary || 'No summary available'}</p>
    </div>
  )
}
