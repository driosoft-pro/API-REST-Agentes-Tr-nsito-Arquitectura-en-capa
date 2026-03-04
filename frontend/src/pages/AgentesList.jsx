import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import Alert from "../components/Alert";

export default function AgentesList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    try {
      const data = await api.listAgentes();
      setItems(data || []);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(a =>
      [a.nombre, a.placa, a.rango].some(v => String(v || "").toLowerCase().includes(s))
    );
  }, [items, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Agentes</h1>
          <p className="text-slate-400 text-sm">CRUD REST para tu sistema de comparendos.</p>
        </div>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, placa o rango…"
            className="w-full md:w-72 rounded-2xl bg-slate-900 border border-slate-800 px-3 py-2 text-sm outline-none focus:border-slate-600"
          />
          <button onClick={load} className="rounded-2xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm">
            Recargar
          </button>
        </div>
      </div>

      {err ? <Alert type="error">{err}</Alert> : null}

      <div className="overflow-x-auto border border-slate-800 rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-slate-200">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Nombre</th>
              <th className="text-left px-4 py-3">Placa</th>
              <th className="text-left px-4 py-3">Rango</th>
              <th className="text-left px-4 py-3">Activo</th>
              <th className="text-right px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-t border-slate-800 hover:bg-slate-900/40">
                <td className="px-4 py-3 text-slate-300">{a.id}</td>
                <td className="px-4 py-3">{a.nombre}</td>
                <td className="px-4 py-3 text-slate-300">{a.placa}</td>
                <td className="px-4 py-3 text-slate-300">{a.rango}</td>
                <td className="px-4 py-3">{a.activo ? "Sí" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <Link className="text-emerald-400 hover:text-emerald-300" to={`/agentes/${a.id}`}>
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr className="border-t border-slate-800">
                <td className="px-4 py-6 text-slate-400" colSpan={6}>Sin resultados</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
