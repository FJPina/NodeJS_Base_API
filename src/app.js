import config  from './config.js';
import express from 'express';
import morgan from 'morgan';
import error from './middlewares/errors.js';

import direccion from './routes/DireccionRoutes.js';
import usuario from'./routes/UsuarioRoutes.js';
import login from './routes/LoginRoutes.js';
import modulo from './routes/ModuloRoutes.js';
import rol from './routes/RolRoutes.js';

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

export default app;