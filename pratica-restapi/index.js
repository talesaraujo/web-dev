const express = require('express');

const app = express();

const helper = require('./helpers');

app.use(express.json());


var alunos = [];
var campi = [];


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
    const index = helper.buscaAluno(matr, alunos);

    // Se o aluno não existir
    if (index < 0) {
        return res.status(404).send("Não existe aluno cadastrado com este número de matrícula.");
    }
    // Existindo, retorna o nome
    return res.send(alunos[index].nome);
});


/**
 * Inclui um novo aluno no servidor e retorna os dados do aluno cadastrado.
 * Retorna os códigos de erros correspondentes caso já exista aluno com a 
 * matrícula selecionada ou erros internos do servidor.
 */
app.post("/api/alunos", (req, res) => {
    const aluno = req.body;

    // Aplica validação pelos campos do aluno necessários
    const { error } = helper.validarAluno(aluno);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Se o aluno já existir
    if (helper.buscaAluno(aluno.matricula, alunos) >= 0) {
        return res.status(409).send("Erro: Já existe um aluno com a matrícula fornecida!");
    }

    const listaCampi = helper.obterCampi(campi); 
    

    // Verifica se o campus do aluno está contido na lista
    var campusNotFound = true; var i = 0;
    
    while (campusNotFound && (i < listaCampi.length)) {
        if (listaCampi[i] === aluno.campus) {
            campusNotFound = false;
        }
        i++;
    }
    if (campusNotFound) {
        return res.status(412).send("Erro: O campus informado não consta no sistema");
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
    const aluno = req.body;

    // Valida corpo da requisição
    const { error } = helper.validarAluno(aluno);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const matr = req.params.matricula;
    const indice = helper.buscaAluno(matr, alunos);

    // Se o aluno não existir
    if (indice < 0) {
        return res.status(404).send("Erro: Aluno não encontrado!");
    }

    listaCampi = helper.obterCampi(campi);
    
    // Verifica se o campus do aluno está contido na lista
    if (!(aluno.campus in listaCampi)) {
        return res.status(412).send("Erro: O campus informado não consta no sistema");
    }

    // Atualiza os dados do aluno e o retorna com dados atualizados.
    ['nome', 'datanasc', 'email', 'ddd', 'telefone', 'operadora', 'campus', 'curso']
    .forEach((attr) => {
        alunos[indice][attr] = aluno[attr];
    });

    return res.send(alunos[indice]);
});


/**
 * Remove o aluno com a matrícula passada na chamada do endpoint e e retorna os
 * dados do aluno removido. Retorna os códigos de erros correspondentes caso
 * não exista aluno com a matrícula selecionada ou erros internos do servidor
 */
app.delete("/api/alunos/:matricula", (req, res) => {
    const matr = req.params.matricula;
    const index = helper.buscaAluno(matr, alunos);

    // Caso o aluno não exista
    if (index < 0) {
        return res.status(404).send("Erro: Aluno não encontrado!");
    }

    // Exclui da lista e o retorna
    return res.send(helper.removeAluno(index, alunos));
});


/**
 * Retorna a lista de campi armazenadas no servidor. Cada campus deve guardar as
 * informações dos cursos que são  oferecidos. 
 */
app.get("/api/campi", (req, res) => {
    res.send(campi);
});


/**
* Retorna os dados do campus cujo código é passado na chamada, bem como seus
* cursos. Retorna os códigos de erros correspondentes caso não exista campus
* com a código repassado ou erros internos do servidor
 */
app.get("/api/campi/:codigo", (req, res) => {
    const cod = req.params.codigo;
    const index = helper.buscaCampus(cod, campi);

    if (index < 0) {
        return res.status(404).send("Erro: Campus não encontrado!");
    }
    return res.send(campi[index]);
});


/***
 * Inclui um campus no servidor e retorna os dados cadastrados. Retorna os 
 * códigos de erros correspondentes caso já exista campus com o código 
 * informado ou erros internos do servidor
 */
app.post("/api/campi/", (req, res) => {
    campus = req.body;

    const { error } = helper.validarCampus(campus);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const index = helper.buscaCampus(campus.codigo, campi);

    // Se o curso já existir, retorna 409 (conflict)
    if (index >= 0) {
        return res.status(409).send("Erro: Campus já existente!");
    }

    campi.push(campus);

    return res.send(campus);
});


/**
 * Altera dados de um campus com código passado na chamada do endpoint,
 * e retorna o campus com os dados modificados. Retorna os códigos de erros
 * correspondentes caso não exista campus com a código selecionado ou erros
 * internos do servidor
 */
app.put("/api/campi/:codigo", (req, res) => {
    campus = req.body;

    // Valida o novo campus de acordo com os requisitos
    const { error } = helper.validarCampus(campus);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const cod = req.params.codigo
    const index = helper.buscaCampus(cod, campi);

    // Caso o campus fornecido não exista
    if (index < 0) {
        return res.status(404).send("Erro: Campus não encontrado!");
    }

    // Atualiza o campus e retorna este novo campus com dados atualizados.
    ['campus', 'cursos']
    .forEach((attr) => {
        campi[index][attr] = campus[attr];
    });

    return res.send(campi[index]);
});


/**
 * Remove o campus com a código passado na chamada do endpoint e retorna os
 * dados do campus removido. Remove todos os alunos matriculados em cursos
 * daquele campus. Retorna os códigos de erros correspondentes caso não exista
 * campus com o código informado ou erros internos do servidor
 */
app.delete("/api/campi/:codigo", (req, res) => {
    const cod = req.params.codigo;
    const index = helper.buscaCampus(cod, campi);

    // Caso o campus não exista
    if (index < 0) {
        return res.status(404).send("Erro: Campus não encontrado!");
    }

    // Se o campus existir, remove todos os alunos dos cursos e remove o campus.
    return res.send(helper.removeCampus(index, campi, alunos));
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

