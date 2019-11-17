const Campus = require("../models/campus");

const helper = require("../util/helpers");


const listaCampi = async (req, res) => {
    campi = await Campus.find({});

    return res.json(campi);
}


const obterCampus = async (req, res) => {
    const cod = req.params.codigo;

    try {
        campus = await Campus.findOne({"codigo": cod});

        if (!campus) {
            return res.status(404).send("Erro: Campus não encontrado");
        }
        return res.status(200).send(campus);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor");
    }
}


const inserirCampus = async (req, res) => {
    const cod = req.body.codigo;

    const { error } = helper.validarCampus(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        if (await Campus.findOne({"codigo": cod})) {
            return res.status(409).send("Erro: Campus já existe!");
        }
        const campus = await Campus.create(req.body);
        
        return res.status(201).send(campus);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor");
    }
}


const atualizarCampus = async (req, res) => {
    const cod = req.params.codigo;

    const { error } = helper.validarCampus(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const filter = {"codigo": cod};
        const updated = {
            "codigo": req.body.codigo,
            "nome": req.body.nome,
            "cursos": req.body.cursos
        }

        novoCampus = await Campus.findOneAndUpdate(filter, updated, {new: true});

        if (!novoCampus) {
            return res.status(404).send("Erro: Campus não encontrado");
        }
        return res.status(200).send(novoCampus);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor"); 
    }
}


const removerCampus = async (req, res) => {
    const cod = req.params.codigo;

    try {
        const filter = {"codigo": cod};
        
        campusRemovido = await Campus.findOneAndDelete(filter);

        if (!campusRemovido) {
            return res.status(404).send("Erro: Campus não encontrado");
        }
        return res.status(200).send(campusRemovido);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor"); 
    }
}


module.exports = {
    listaCampi, obterCampus, inserirCampus, atualizarCampus, removerCampus
}