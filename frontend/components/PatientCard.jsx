import React from 'react'

export default function PatientCard({patient}) {
  return (
    <div style={{border: '1px solid #eee', padding: '1rem', borderRadius: 6}}>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
    </div>
  )
}
