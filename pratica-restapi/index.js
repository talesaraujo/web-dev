const express = require('express');

const app = express();

const helper = require('./helpers');

app.use(express.json());


var alunos = [];


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
    const aluno = helper.findAluno(matr, alunos);

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
    const aluno = {
        matricula: req.body.matricula,
        nome: req.body.nome
    };

    // Aplica validação pelos campos do aluno necessários
    const { error } = helper.validarAluno(aluno);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Se o aluno já existir
    if (helper.exists(aluno.matricula, alunos) >= 0) {
        return res.status(409).send("Erro: Já existe um aluno com a matrícula fornecida!");
    }

    // Caso contrário, insere na lista
    alunos.push(aluno);
    return res.send(aluno);
});

/**
 * Altera dados de um aluno com a matrícula passada na chamada do endpoint 
 * e retorna o aluno com os dados modificados. Retorna os códigos de erros
 * correspondentes caso não exista aluno com a matrícula selecionada ou erros
 * internos do servidor.
 */
app.put("/api/alunos/:matricula", (req, res) => {
    // Valida corpo da requisição
    const { error } = helper.validarAluno(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const matr = req.params.matricula;
    const indice = helper.exists(matr, alunos);

    // Se o aluno não existir
    if (indice < 0) {
        return res.status(404).send("Erro: Aluno não encontrado!");
    }

    // Atualiza os dados do aluno e o retorna com dados atualizados.
    alunos[indice].nome = req.body.nome;    

    return res.send(alunos[indice]);
});


/**
 * Remove o aluno com a matrícula passada na chamada do endpoint e e retorna os
 * dados do aluno removido. Retorna os códigos de erros correspondentes caso
 * não exista aluno com a matrícula selecionada ou erros internos do servidor
 */
app.delete("/api/alunos/:matricula", (req, res) => {
    const matr = req.params.matricula;
    const index = helper.exists(matr, alunos);

    // Caso o aluno não exista
    if (index < 0) {
        return res.status(404).send("Erro: Aluno não encontrado!");
    }

    // Exclui da lista e o retorna
    aluno = alunos.splice(index, 1);
    return res.send(aluno);
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

