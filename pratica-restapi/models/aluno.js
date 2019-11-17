const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
    {
        matricula: {
            type: String,
            required: true,
            unique: true
        },
        nome: String,
        datanasc: String,
        email: String,
        ddd: Number,
        telefone: String,
        operadora: String,
        campus: String,
        curso: String
    }
);


module.exports = mongoose.model('Aluno', AlunoSchema);
