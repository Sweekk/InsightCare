import React from 'react'

export default function AddPatientModal({onClose, onSave}) {
  return (
    <div style={{padding: '1rem'}}>
      <h3>Add Patient</h3>
      <form onSubmit={(e) => {e.preventDefault(); onSave({name: 'New Patient', age: 0})}}>
        <input name="name" placeholder="Name" />
        <button type="submit">Save</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
