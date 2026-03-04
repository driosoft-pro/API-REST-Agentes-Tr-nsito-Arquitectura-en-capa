const service = require("./agentes.service");

function toInt(v) {
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
}

exports.listar = async (_req, res) => {
  try {
    const agentes = await service.listarAgentes();
    return res.status(200).json(agentes);
  } catch (err) {
    console.error("listar:", err);
    return res.status(500).json({ error: "Error del servidor al listar agentes" });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });

    const agente = await service.obtenerAgentePorId(id);
    if (!agente) return res.status(404).json({ error: "Agente no encontrado" });

    return res.status(200).json(agente);
  } catch (err) {
    console.error("obtener:", err);
    return res.status(500).json({ error: "Error del servidor al obtener agente" });
  }
};

exports.crear = async (req, res) => {
  try {
    const created = await service.crearAgente(req.body ?? {});
    return res.status(201).json({ mensaje: "Agente creado", agente: created });
  } catch (err) {
    if (err?.code === "VALIDATION") return res.status(400).json({ error: err.message });
    if (err?.code === "DUPLICATE") return res.status(409).json({ error: err.message });
    console.error("crear:", err);
    return res.status(500).json({ error: "Error del servidor al crear agente" });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });

    const updated = await service.actualizarAgente(id, req.body ?? {});
    if (!updated) return res.status(404).json({ error: "Agente no encontrado" });

    return res.status(200).json({ mensaje: "Agente actualizado", agente: updated });
  } catch (err) {
    if (err?.code === "VALIDATION") return res.status(400).json({ error: err.message });
    if (err?.code === "DUPLICATE") return res.status(409).json({ error: err.message });
    console.error("actualizar:", err);
    return res.status(500).json({ error: "Error del servidor al actualizar agente" });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (!id) return res.status(400).json({ error: "id inválido" });

    const ok = await service.eliminarAgente(id);
    if (!ok) return res.status(404).json({ error: "Agente no encontrado" });

    return res.status(200).json({ mensaje: "Agente eliminado (soft delete)" });
  } catch (err) {
    console.error("eliminar:", err);
    return res.status(500).json({ error: "Error del servidor al eliminar agente" });
  }
};
