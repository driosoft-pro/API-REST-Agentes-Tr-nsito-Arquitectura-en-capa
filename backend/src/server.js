require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const healthRoutes = require("./routes/health.routes");
const agentesRoutes = require("./modules/agentes/agentes.routes");

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use(healthRoutes);
app.use(agentesRoutes);

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`[agentes-service] listening on :${port}`));
