// Base URL for the client-assistant backend. Configurable via VITE_API_BASE
// (e.g. http://localhost:3001); defaults to same-origin. CORS is enabled server-side.
const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error(`health failed: ${res.status}`);
  return res.json();
}

export async function fetchClients() {
  const res = await fetch(`${API_BASE}/api/clients`);
  if (!res.ok) throw new Error(`clients fetch failed: ${res.status}`);
  return res.json();
}

export async function sendChat(clientId, message) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ clientId, message }),
  });
  if (!res.ok) throw new Error(`chat failed: ${res.status}`);
  return res.json();
}
