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
        nome: Joi.string().min(3).required(),
        datanasc: Joi.string().min(10).max(10),
        email: Joi.string(),
        ddd: Joi.number().integer(),
        telefone: Joi.string().min(10).max(10),
        operadora: Joi.string(),
        campus: Joi.string().required(),
        curso: Joi.string().required()
    };
    return Joi.validate(aluno, schema);
}


function removeAluno(index, alunos) {
    return alunos.splice(index, 1);
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


/**
 * Valida o campus fornecido pelos campos adequados. 
 */
function validarCampus(campus) {
    const schema = {
        codigo: Joi.number().integer().required(),
        campus: Joi.string().required(),
        cursos: Joi.array().min(1).required()
    };
    return Joi.validate(campus, schema);
}

/**
 * Define uma lista de campus, apaga todos os alunos associados com
 * cada campus dessa lista, e por final apaga o campus.
 * Retorna o campus removido.
 */
function removeCampus(index, campi, alunos) {
    // Reúne os cursos daquele campus em um array
    const cursos = campi[index].cursos;
    const alunos_marcados = [];

    // Para cada curso da lista do campus, verifique seus alunos e marque-os 
    for (var i = 0; i < cursos.length; i++) {
        for (var j = 0; j < alunos.length; j++) {
            if ((alunos[j].curso === cursos[i]) && (!(alunos[j] in alunos_marcados))) {
                alunos_marcados.push(alunos[j]);
            }
        }
    }
       
    // Remove apenas os alunos da lista de marcados
    for (var i = 0; i < alunos_marcados.length; i++) {
        index = buscaAluno(alunos_marcados[i].matricula, alunos);
        removeAluno(index, alunos);
    }

    // Remove o campus
    return campi.splice(index, 1);
}


module.exports = {
    buscaAluno, obterAluno, validarAluno, removeAluno, buscaCampus, validarCampus, removeCampus
};