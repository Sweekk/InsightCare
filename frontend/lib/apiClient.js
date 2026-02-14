const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export async function fetchPatients() {
  return request('/patients')
}

export async function fetchPatient(id) {
  return request(`/patients/${id}`)
}

export async function createPatient(data) {
  return request('/patients', { method: 'POST', body: JSON.stringify(data) })
}

export async function fetchMood(patientId) {
  return request(`/patients/${patientId}/moods`)
}
