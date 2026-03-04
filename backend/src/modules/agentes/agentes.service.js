const { z } = require("zod");
const repo = require("./agentes.repository.pg");

// Validación (capa negocio)
const createSchema = z.object({
  nombre: z.string().min(1),
  placa: z.string().min(1),
  rango: z.string().min(1),
  activo: z.boolean().optional().default(true),
});

const updateSchema = z.object({
  nombre: z.string().min(1).optional(),
  placa: z.string().min(1).optional(),
  rango: z.string().min(1).optional(),
  activo: z.boolean().optional(),
});

exports.listarAgentes = async () => repo.findAll();

exports.obtenerAgentePorId = async (id) => repo.findById(id);

exports.crearAgente = async (payload) => {
  const parsed = createSchema.safeParse(payload);
  if (!parsed.success) {
    const err = new Error(parsed.error.issues.map(i => i.message).join(", "));
    err.code = "VALIDATION";
    throw err;
  }
  try {
    const id = await repo.create(parsed.data);
    return repo.findById(id);
  } catch (e) {
    if (e?.code === "23505") {
      const err = new Error("placa ya existe");
      err.code = "DUPLICATE";
      throw err;
    }
    throw e;
  }
};

exports.actualizarAgente = async (id, payload) => {
  const parsed = updateSchema.safeParse(payload);
  if (!parsed.success) {
    const err = new Error(parsed.error.issues.map(i => i.message).join(", "));
    err.code = "VALIDATION";
    throw err;
  }
  try {
    const ok = await repo.update(id, parsed.data);
    if (!ok) return null;
    return repo.findById(id);
  } catch (e) {
    if (e?.code === "23505") {
      const err = new Error("placa ya existe");
      err.code = "DUPLICATE";
      throw err;
    }
    throw e;
  }
};

exports.eliminarAgente = async (id) => repo.softDelete(id);
