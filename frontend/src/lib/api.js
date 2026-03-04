const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  let body = null;
  try { body = await res.json(); } catch {}
  if (!res.ok) {
    const msg = body?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body;
}

export const api = {
  listAgentes: () => request("/api/agentes"),
  getAgente: (id) => request(`/api/agentes/${id}`),
  createAgente: (data) => request("/api/agentes", { method: "POST", body: JSON.stringify(data) }),
  updateAgente: (id, data) => request(`/api/agentes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteAgente: (id) => request(`/api/agentes/${id}`, { method: "DELETE" }),
};
