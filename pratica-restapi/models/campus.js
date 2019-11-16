//const Joi = require("joi");

const campi = []

class Campus {

    constructor(codigo, nome, cursos) {
        this.codigo = codigo;
        this.nome = nome;
        this.cursos = cursos;
    }


    save() {
        campi.push(this);
    }


    update() {
        const c = campi.find((campus) => {
            campus.codigo == this.codigo;
        });

        const index = campi.indexOf(c);
        campi.splice(index, 1, this);
    }


    delete() {
        const c = campi.find((campus) => {
            campus.codigo == this.codigo;
        });

        const index = campi.indexOf(c);
        campi.splice(index, 1);
    }


    static find(_codigo) {
        return campi.find((campus) => {
            campus.codigo == _codigo;
        });
    }

    static fetchAll() {
        return campi;
    }
}



module.exports = Campus;



/**
const Joi = require("joi");


/**
 * Checa se o campus com código fornecido existe. Caso positivo,
 * retorna seu índice, caso contrário, 
 * retorna índice -1 (não existente).
 */
/*
function buscaCampus(cod, campi) {
    for (var i = 0; i < campi.length; i++) {
        if (campi[i].codigo == cod) {
            return i;
        }
    }
    return -1;
}
*/


/**
 * Valida o campus fornecido pelos campos adequados. 
 */
/*
function validarCampus(campus) {
    const schema = {
        codigo: Joi.number().integer().required(),
        campus: Joi.string().required(),
        cursos: Joi.array().min(1).required()
    };
    return Joi.validate(campus, schema);
}
*/


/**
 * Retorna uma lista de strings com cada campus presente
 */
/*
function obterCampi(campi) {
    var lista = []

    for (var i = 0; i < campi.length; i++) {
        lista.push(campi[i].campus);
    }

    return lista;
}
/*


/**
 * Define uma lista de campus, apaga todos os alunos associados com
 * cada campus dessa lista, e por final apaga o campus.
 * Retorna o campus removido.
 */
/*
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
*/

/**
 * Verifica se um determinado aluno contém seu campus
 * cadastrado no sistema. Retorna verdadeiro para o caso
 * de campus não cadastrado.
 */

 /*
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

*/
