-- Postgres / Supabase schema for módulo AGENTES
CREATE SCHEMA IF NOT EXISTS transito;

CREATE TABLE IF NOT EXISTS transito.agente (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  placa VARCHAR(30) NOT NULL UNIQUE,
  rango VARCHAR(60) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ NULL
);

CREATE OR REPLACE FUNCTION transito.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_agente_updated_at ON transito.agente;
CREATE TRIGGER trg_agente_updated_at
BEFORE UPDATE ON transito.agente
FOR EACH ROW
EXECUTE FUNCTION transito.set_updated_at();

INSERT INTO transito.agente (nombre, placa, rango, activo)
VALUES
('Andrea Pérez', 'AGT-1021', 'Patrullero', TRUE),
('Juan Riascos', 'AGT-2033', 'Subintendente', TRUE)
ON CONFLICT (placa) DO NOTHING;
