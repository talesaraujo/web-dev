const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);


const Schema = mongoose.Schema;

const CampusSchema = new Schema(
    {
        codigo: {
            type: String, required: true
        },
        nome: String,
        cursos: Array
    }
);


module.exports = mongoose.model('Campus', CampusSchema);
