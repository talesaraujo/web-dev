const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/webdev',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

const Schema = mongoose.Schema;

const CampusSchema = new Schema(
    {
        codigo: {
            type: String, 
            required: true,
            unique: true
        },
        nome: String,
        cursos: Array
    }
);


module.exports = mongoose.model('Campus', CampusSchema);
