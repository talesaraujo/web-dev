var express = require('express');
var router = express.Router();
const controller = require("../controllers/campi");


router.get("/api/campi", controller.listaCampi);

router.get("/api/campi/:codigo", controller.obterCampus);

router.post("/api/campi", controller.inserirCampus);

router.put("/api/campi/:codigo", controller.atualizarCampus);

router.delete("/api/campi/:codigo", controller.removerCampus);


module.exports = router;
