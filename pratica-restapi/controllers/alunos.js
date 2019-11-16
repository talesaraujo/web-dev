// Importar model

const listaAlunos = (req, res) => {
    const matr = req.params.matricula;
    const index = helper.buscaAluno(matr, alunos);

    // Se o aluno não existir
    if (index < 0) {
        return res.status(404).send("Não existe aluno cadastrado com este número de matrícula.");
    }
    // Existindo, retorna o nome (ou o aluno, se quiser. Apenas retirando a refererência ao atributo.)
    return res.send(alunos[index].nome);
}


const obterAluno = (req, res) => {
    const matr = req.params.matricula;
    const index = helper.buscaAluno(matr, alunos);

    // Se o aluno não existir
    if (index < 0) {
        return res.status(404).send("Não existe aluno cadastrado com este número de matrícula.");
    }
    // Existindo, retorna o nome (ou o aluno, se quiser. Apenas retirando a refererência ao atributo.)
    return res.send(alunos[index].nome);
}


const inserirAluno = (req, res) => {
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

    // Se o campus do aluno não estiver na lista
    if (helper.campusAusente(aluno.campus, campi)) {
        return res.status(412).send("Erro: O campus informado não consta no sistema");
    }
    
    // Caso contrário, insere na lista
    alunos.push(aluno);
    return res.status(201).send(aluno);
}


const atualizarAluno = (req, res) => {
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

    // Se o campus do aluno não estiver na lista
    if (helper.campusAusente(aluno.campus, campi)) {
        return res.status(412).send("Erro: O campus informado não consta no sistema");
    }

    // Atualiza os dados do aluno e o retorna com dados atualizados.
    ['nome', 'datanasc', 'email', 'ddd', 'telefone', 'operadora', 'campus', 'curso']
    .forEach((attr) => {
        alunos[indice][attr] = aluno[attr];
    });

    return res.send(alunos[indice]);
}


const removerAluno = (req, res) => {
    const matr = req.params.matricula;
    const index = helper.buscaAluno(matr, alunos);

    // Caso o aluno não exista
    if (index < 0) {
        return res.status(404).send("Erro: Aluno não encontrado!");
    }

    // Exclui da lista e o retorna
    return res.send(helper.removeAluno(index, alunos));
}

module.exports = {
    listaAlunos, obterAluno, inserirAluno, atualizarAluno, removerAluno
}