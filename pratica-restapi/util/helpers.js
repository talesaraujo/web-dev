const Joi = require("joi");


/**
 * Valida o aluno fornecido pelos campos adequados. 
 */
function validarAluno(aluno) {
    const schema = {
        matricula: Joi.string().required(),
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
 * Valida o campus fornecido pelos campos adequados. 
 */
function validarCampus(campus) {
    const schema = {
        codigo: Joi.string().required(),
        nome: Joi.string().required(),
        cursos: Joi.array().min(1).required()
    };
    return Joi.validate(campus, schema);
}



module.exports = {
    validarAluno, validarCampus
};