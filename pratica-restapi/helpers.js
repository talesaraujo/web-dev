const Joi = require("joi");

/**
 * Checa se o aluno com a matrícula dada existe. Caso positivo,
 * retorna seu índice, caso contrário, 
 * retorna índice -1 (não existente).
 */
function exists(matr, alunos) {
    for (var i = 0; i < alunos.length; i++) {
        if (alunos[i].matricula == matr) {
            return i;
        }
    }
    return -1;
}

/**
 * Retorna o nome do aluno com a dada matrícula se exta existir,
 * caso contrário, retorna nulo.
 */
function findAluno(matr, alunos) {
    const index = exists(matr, alunos);

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


module.exports = {exists, findAluno, validarAluno};