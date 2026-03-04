import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AgentesList from "./pages/AgentesList";
import AgenteForm from "./pages/AgenteForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/agentes" replace />} />
          <Route path="/agentes" element={<AgentesList />} />
          <Route path="/agentes/nuevo" element={<AgenteForm mode="create" />} />
          <Route path="/agentes/:id" element={<AgenteForm mode="edit" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
