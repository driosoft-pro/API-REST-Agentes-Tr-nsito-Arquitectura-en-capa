const { Router } = require("express");
const controller = require("./agentes.controller");

const router = Router();

router.get("/api/agentes", controller.listar);
router.get("/api/agentes/:id", controller.obtenerPorId);
router.post("/api/agentes", controller.crear);
router.put("/api/agentes/:id", controller.actualizar);
router.delete("/api/agentes/:id", controller.eliminar);

module.exports = router;
