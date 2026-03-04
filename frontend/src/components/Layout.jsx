import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-slate-800 flex items-center justify-center font-bold">T</div>
            <div>
              <div className="text-lg font-semibold leading-tight">Módulo Agentes</div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              className={
                "px-3 py-2 rounded-xl text-sm " +
                (pathname.startsWith("/agentes") ? "bg-slate-800" : "hover:bg-slate-900")
              }
              to="/agentes"
            >
              Agentes
            </Link>
            <Link className="px-3 py-2 rounded-xl text-sm bg-emerald-600 hover:bg-emerald-500" to="/agentes/nuevo">
              Nuevo
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-8 text-xs text-slate-500">
        API: <code className="text-slate-300">{import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}</code>
      </footer>
    </div>
  );
}
