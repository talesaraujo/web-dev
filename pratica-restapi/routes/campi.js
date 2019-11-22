var express = require('express');
var router = express.Router();
const controller = require("../controllers/campi");


router.get("/", controller.listaCampi);

router.get("/:codigo", controller.obterCampus);

router.post("/", controller.inserirCampus);

router.put("/:codigo", controller.atualizarCampus);

router.delete("/:codigo", controller.removerCampus);


module.exports = router;
