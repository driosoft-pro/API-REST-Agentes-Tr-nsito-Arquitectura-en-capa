const { pool } = require("../../config/db");

exports.findAll = async () => {
  const { rows } = await pool.query(
    `SELECT id, nombre, placa, rango, activo
     FROM transito.agente
     WHERE deleted_at IS NULL
     ORDER BY id DESC`
  );
  return rows;
};

exports.findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, nombre, placa, rango, activo
     FROM transito.agente
     WHERE id = $1 AND deleted_at IS NULL
     LIMIT 1`,
    [id]
  );
  return rows[0] ?? null;
};

exports.create = async ({ nombre, placa, rango, activo }) => {
  const { rows } = await pool.query(
    `INSERT INTO transito.agente (nombre, placa, rango, activo)
     VALUES ($1,$2,$3,$4)
     RETURNING id`,
    [nombre, placa, rango, activo]
  );
  return rows[0].id;
};

exports.update = async (id, patch) => {
  const keys = Object.keys(patch);
  if (keys.length === 0) return true;

  const set = keys.map((k, idx) => `${k} = $${idx + 1}`).join(", ");
  const values = keys.map(k => patch[k]);
  values.push(id);

  const { rowCount } = await pool.query(
    `UPDATE transito.agente
     SET ${set}
     WHERE id = $${keys.length + 1} AND deleted_at IS NULL`,
    values
  );
  return rowCount > 0;
};

exports.softDelete = async (id) => {
  const { rowCount } = await pool.query(
    `UPDATE transito.agente
     SET deleted_at = NOW()
     WHERE id = $1 AND deleted_at IS NULL`,
    [id]
  );
  return rowCount > 0;
};
