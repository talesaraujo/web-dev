const express = require('express');

const app = express();

const helpers = require('./helpers');

const PORT = process.env.PORT || 5000;


var alunos = [
    {
        "matricula": 0,
        "nome": "Fulano"
    },
    {
        "matricula": 1,
        "nome": "Beltrano"
    }
];


/**
 * Retorna a lista de alunos do servidor
 */
app.get("/api/alunos", (req, res) => {
    return res.send(alunos);
});


/**
 * Retorna os dados do aluno cuja matrícula é passada
 * na chamada. Retorna os códigos de erro correspondentes
 * caso não exista aluno com matrícula selecionada ou erros
 * internos do servidor.
 */
app.get("/api/alunos/:matricula", (req, res) => {
    const matr = req.params.matricula;
    const aluno = helpers.findAluno(matr, alunos);

    // Se o aluno não existir
    if (!aluno) {
        return res.status(404).send("Não existe aluno cadastrado com este número de matrícula.");
    }
    // Existindo, retorna o nome
    return res.send(aluno);
});


/**
 * Inclui um novo aluno no servidor e retorna os dados do aluno cadastrado.
 * Retorna os códigos de erros correspondentes caso já exista aluno com a 
 * matrícula selecionada ou erros internos do servidor.
 */
app.post("/api/alunos", (req, res) => {
    
});




app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});




