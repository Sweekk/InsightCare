const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeader() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getPatients() {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_BASE}/patients`, {
    headers,
  });

  return res.json();
}

export async function getDoctorReport() {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_BASE}/doctor-report`, {
    method: "POST",
    headers,
  });

  return res.json();
}

export async function createPatient(data) {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
}
