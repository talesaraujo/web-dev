//const Joi = require("joi");

const alunos = []

class Aluno {

    constructor(
        matricula, nome, datanasc, email, campus, curso, ddd, telefone, operadora) {

        this.matricula = matricula;
        this.nome = nome;
        this.datanasc = datanasc;
        this.email = email;
        this.campus = campus;
        this.curso = curso;
        this.ddd = ddd;
        this.telefone = telefone;
        this.operadora = operadora
    }
    

    save() {
        alunos.push(this);
    }


    update() {
        const a = alunos.find((aluno) => {
            aluno.matricula == this.matricula;
        });
        
        const index = alunos.indexOf(a);
        alunos.splice(index, 1, this);
    }


    delete() {
        const a = alunos.find((aluno) => {
            aluno.matricula == this.matricula;
        });

        const index = alunos.indexOf(a);
        alunos.splice(index, 1);        
    }


    static find(_matricula) {
        return alunos.find((aluno) => {
            aluno.matricula == _matricula;
        });
    }


    static fetchAll() {
        return alunos;
    } 
}



module.exports = Aluno;



/*

function save() {
    alunos.push 
}


function fetchAll() {
    return alunos;
}


function find(matr)





function findAluno() {
    return alunos.find((matr) => {
        alunos.matr == 
    });
}
*/

/**
 * Checa se o aluno com a matrícula dada existe. Caso positivo,
 * retorna seu índice, caso contrário, 
 * retorna índice -1 (não existente).
 */
/*
function buscaAluno(matr, alunos) {
    for (var i = 0; i < alunos.length; i++) {
        if (alunos[i].matricula == matr) {
            return i;
        }
    }
    return -1;
}
*/

/**
 * Valida o aluno fornecido pelos campos adequados. 
 */
/*
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
*/

/**
 * Remove aluno da lista dado seu índice
 */
/*
function removeAluno(index, alunos) {
    return alunos.splice(index, 1);
}
*/