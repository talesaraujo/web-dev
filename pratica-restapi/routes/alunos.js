var express = require('express');
var router = express.Router();
const controller = require("../controllers/alunos");


router.get("/", controller.listaAlunos);

router.get("/:matricula", controller.obterAluno);

router.post("/", controller.inserirAluno);

router.put("/:matricula", controller.atualizarAluno);

router.delete("/:matricula", controller.removerAluno);


module.exports = router;
