var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


// Importar rotas
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


var app = express();

// Views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
//app.use('/users', usersRouter);


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