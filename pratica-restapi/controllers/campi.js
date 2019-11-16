// Importar model

const listaCampi = (req, res) => {
    res.send(campi);
}

const obterCampus = (req, res) => {
    const cod = req.params.codigo;
    const index = helper.buscaCampus(cod, campi);

    if (index < 0) {
        return res.status(404).send("Erro: Campus não encontrado!");
    }
    return res.send(campi[index]);
}

const inserirCampus = (req, res) => {
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

    return res.status(201).send(campus);
}

const atualizarCampus = (req, res) => {
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
}

const removerCampus = (req, res) => {
    const cod = req.params.codigo;
    const index = helper.buscaCampus(cod, campi);

    // Caso o campus não exista
    if (index < 0) {
        return res.status(404).send("Erro: Campus não encontrado!");
    }

    // Se o campus existir, remove todos os alunos dos cursos e remove o campus.
    return res.send(helper.removeCampus(index, campi, alunos));
}


module.exports = {
    listaCampi, obterCampus, inserirCampus, atualizarCampus, removerCampus
}