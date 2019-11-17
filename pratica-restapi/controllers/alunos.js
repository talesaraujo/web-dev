const Aluno = require("../models/aluno");
const helper = require("../util/helpers");


const listaAlunos = async (req, res) => {
    alunos = await Aluno.find({});

    return res.json(alunos);
}


const obterAluno = async (req, res) => {
    const matr = req.params.matricula;

    try {
        aluno = await Aluno.findOne({"matricula": matr});

        if (!aluno) {
            return res.status(404).send("Erro: Aluno não encontrado");
        }
        return res.status(200).send(aluno);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor");
    }
}


const inserirAluno = async (req, res) => {
    const matr = req.body.matricula;

    const { error } = helper.validarAluno(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        if (await Aluno.findOne({"matricula": matr})) {
            return res.status(409).send("Erro: Aluno já existe!");
        }
        const aluno = await Aluno.create(req.body);
        
        return res.status(201).send(aluno);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor");
    }
};


const atualizarAluno = async (req, res) => {
    const matr = req.params.matricula;

    const { error } = helper.validarAluno(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const filter = {"matricula": matr};
        const updated = {
            "matricula": req.body.matricula,
            "nome": req.body.nome,
            "datanasc": req.body.datanasc,
            "email": req.body.email,
            "ddd": req.body.ddd,
            "telefone": req.body.telefone,
            "operadora": req.body.operadora,
            "campus": req.body.campus,
            "curso": req.body.curso
        }

        novoAluno = await Aluno.findOneAndUpdate(filter, updated, {new: true});

        if (!novoAluno) {
            return res.status(404).send("Erro: Aluno não encontrado");
        }
        return res.status(200).send(novoAluno);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor"); 
    }
};


const removerAluno = async (req, res) => {
    const matr = req.params.matricula;

    try {
        const filter = {"matricula": matr};
        
        alunoRemovido = await Aluno.findOneAndDelete(filter);

        if (!alunoRemovido) {
            return res.status(404).send("Erro: Aluno não encontrado");
        }
        return res.status(200).send(alunoRemovido);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Erro interno do servidor"); 
    }
}



module.exports = {
    listaAlunos, obterAluno, inserirAluno, atualizarAluno, removerAluno
}