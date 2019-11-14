var express = require('express');
var router = express.Router();
const controller = require("../controllers/alunos");


router.get("/api/alunos", controller.listaAlunos);

router.get("/api/alunos/:matricula", controller.obterAluno);

router.post("/api/alunos", controller.inserirAluno);

router.put("/api/alunos/:matricula", controller.atualizarAluno);

router.delete("/api/alunos/:matricula", controller.removerAluno);


module.exports = router;
