var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


// Importar rotas
var indexRouter = require('./routes/index');
var alunosRouter = require('./routes/alunos');
var campiRouter = require('./routes/campi');

// Definir aplicação express
var app = express();

// Setup das views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Definição das rotas
app.use('/', indexRouter);
app.use('/api/alunos', alunosRouter);
app.use('/api/campi', campiRouter);


// Captura erro 404 e delega-o ao gerenciador de erro
app.use(function(req, res, next) {
    next(createError(404));
});

// Gerenciador de erro
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.render('error');
});

module.exports = app;