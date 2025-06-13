const config  = require('./config');
const express = require('express');
const morgan = require('morgan');
const error = require('./middlewares/errors');

const direccion = require('./routes/DireccionRoutes');
const usuario = require('./routes/UsuarioRoutes');
const login = require('./routes/LoginRoutes');
const modulo = require('./routes/ModuloRoutes');
const rol = require('./routes/RolRoutes');

const app = express();

//Middelware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuracion

app.set('port', config.app.port);
// console.log(config.app.port, config.app.stringConnecion)

//Rutas
app.use('/api/direccion', direccion);
app.use('/api/usuario', usuario);
app.use('/api/login', login);
app.use('/api/modulo', modulo);
app.use('/api/rol', rol);
app.use(error);

module.exports = app;