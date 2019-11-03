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


/**
 * Remove aluno da lista dado seu índice
 */
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
 * Retorna uma lista de strings com cada campus presente
 */
function obterCampi(campi) {
    var lista = []

    for (var i = 0; i < campi.length; i++) {
        lista.push(campi[i].campus);
    }

    return lista;
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


/**
 * Verifica se um determinado aluno contém seu campus
 * cadastrado no sistema. Retorna verdadeiro para o caso
 * de campus não cadastrado.
 */
function campusAusente(campus, campi) {
    let listaCampi = obterCampi(campi); 
    
    // Verifica se o campus fornecido está contido na lista
    var campusNotFound = true; var i = 0;
    
    while (campusNotFound && (i < listaCampi.length)) {
        if (listaCampi[i] === campus) {
            campusNotFound = false;
        }
        i++;
    }
    return campusNotFound
}


/**
 * Verifica se uma determinada data está dentro de um período de duas 
 * outras datas. Assume que o formato de entrada de data está definido
 * como a string "YYYY-MM-DD"
 */
function entrePeriodo(data, inicio, fim) {
    let data_atual = new Date(data);
    let data_inicio = new Date(inicio);
    let data_fim = new Date(fim);

    if ((data_atual >= data_inicio) && (data_atual <= data_fim)) {
        return true;
    }
    return false;
}


/**
 * Retorna um array com a lista de alunos de acordo com a consulta fornecida
 */
function geraConsulta(consulta, alunos) {
    let listaConsulta = []

    if (consulta.campus) {
        for (var i = 0; i < alunos.length; i++) {
            if (alunos[i].campus === consulta.campus) {
                listaConsulta.push(alunos[i]);
            }
        }
        return listaConsulta;
    }
    if (consulta.curso) {
        for (var i = 0; i < alunos.length; i++) {
            if (alunos[i].curso === consulta.curso) {
                listaConsulta.push(alunos[i]);
            }
        }
        return listaConsulta;
    }
    if (consulta.datainicio) {
        for (var i = 0; i < alunos.length; i++) {
            if (entrePeriodo(alunos[i].datanasc, consulta.datainicio, consulta.datafim)) {
                listaConsulta.push(alunos[i]);
            }
        }
        return listaConsulta;
    }
}


module.exports = {
    buscaAluno, obterAluno, validarAluno, removeAluno, 
    buscaCampus, validarCampus, obterCampi, removeCampus, campusAusente,
    entrePeriodo, geraConsulta
};