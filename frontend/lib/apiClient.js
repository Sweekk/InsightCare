const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getPatients() {
  const res = await fetch(`${API_BASE}/patients`, {
    headers: getAuthHeaders(),
  });

  return res.json();
}

export async function getDoctorReport() {
  const res = await fetch(`${API_BASE}/doctor-report`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  return res.json();
}

export async function getCurrentDoctor() {
  const res = await fetch(`${API_BASE}/me`, {
    headers: getAuthHeaders(),
  });

  return res.json();
}

export async function createPatient(data) {
  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function sendAIMessage(data) {
  const res = await fetch(`${API_BASE}/ai-chat`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
}
