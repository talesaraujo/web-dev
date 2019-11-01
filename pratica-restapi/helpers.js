const Joi = require("joi");

/**
 * Checa se o aluno com a matrícula dada existe. Caso positivo,
 * retorna seu índice, caso contrário, 
 * retorna índice -1 (não existente).
 */
function buscaAluno(matr, alunos) {
    for (var i = 0; i < alunos.length; i++) {
        if (alunos[i].matricula == matr) {
            return i;
        }
    }
    return -1;
}

/**
 * Retorna o nome do aluno com a dada matrícula se esta existir,
 * caso contrário, retorna nulo.
 */
function obterAluno(matr, alunos) {
    const index = buscaAluno(matr, alunos);

    // Caso o aluno não exista
    if (index < 0) {
        return null;
    }
    return alunos[index].nome;
}

/**
 * Valida o aluno fornecido pelos campos adequados. 
 */
function validarAluno(aluno) {
    const schema = {
        matricula: Joi.number().required(),
        nome: Joi.string().min(3).required()
    };
    return Joi.validate(aluno, schema);
}

/**
 * Checa se o campus com código fornecido existe. Caso positivo,
 * retorna seu índice, caso contrário, 
 * retorna índice -1 (não existente).
 */
function buscaCampus(cod, campi) {
    for (var i = 0; i < campi.length; i++) {
        if (campi[i].codigo == cod) {
            return i;
        }
    }
    return -1;
}


module.exports = {buscaAluno, obterAluno, validarAluno, buscaCampus};