import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import Alert from "../components/Alert";

export default function AgenteForm({ mode }) {
  const nav = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({ nombre: "", placa: "", rango: "", activo: true });
  const [msg, setMsg] = useState({ type: "info", text: "" });
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode !== "edit") return;
    (async () => {
      try {
        const data = await api.getAgente(id);
        setForm({
          nombre: data.nombre ?? "",
          placa: data.placa ?? "",
          rango: data.rango ?? "",
          activo: !!data.activo,
        });
      } catch (e) {
        setMsg({ type: "error", text: e.message });
      } finally {
        setLoading(false);
      }
    })();
  }, [mode, id]);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg({ type: "info", text: "" });
    try {
      if (mode === "create") {
        await api.createAgente(form);
        setMsg({ type: "success", text: "Agente creado" });
        nav("/agentes");
      } else {
        await api.updateAgente(id, form);
        setMsg({ type: "success", text: "Agente actualizado" });
      }
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    }
  }

  async function onDelete() {
    if (!confirm("¿Eliminar agente? (soft delete)")) return;
    try {
      await api.deleteAgente(id);
      nav("/agentes");
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    }
  }

  if (loading) return <Alert>cargando…</Alert>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{mode === "create" ? "Nuevo agente" : "Editar agente"}</h1>
          <p className="text-slate-400 text-sm">Campos básicos para el módulo de comparendos.</p>
        </div>
        <Link to="/agentes" className="text-slate-300 hover:text-slate-100">Volver</Link>
      </div>

      {msg.text ? <Alert type={msg.type}>{msg.text}</Alert> : null}

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Nombre</span>
            <input
              className="rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-slate-600"
              value={form.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              required
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Placa</span>
            <input
              className="rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-slate-600"
              value={form.placa}
              onChange={(e) => set("placa", e.target.value)}
              placeholder="AGT-0001"
              required
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm">
            <span className="text-slate-300">Rango</span>
            <input
              className="rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 outline-none focus:border-slate-600"
              value={form.rango}
              onChange={(e) => set("rango", e.target.value)}
              placeholder="Patrullero"
              required
            />
          </label>

          <label className="flex items-center gap-3 mt-7 text-sm">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => set("activo", e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-slate-300">Activo</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button type="submit" className="rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm">
            {mode === "create" ? "Crear" : "Guardar"}
          </button>

          {mode === "edit" ? (
            <button type="button" onClick={onDelete} className="rounded-2xl bg-rose-700 hover:bg-rose-600 px-4 py-2 text-sm">
              Eliminar
            </button>
          ) : null}

          <span className="text-xs text-slate-500 ml-auto">
            API: {import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}
          </span>
        </div>
      </form>
    </div>
  );
}
