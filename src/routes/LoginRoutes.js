import express from 'express';
import respuestas from '../utils/respuestas.js';
import controlador from '../controllers/LoginController.js';
import seguridad from '../middlewares/security.js';

const router = express.Router();

//Rutas
router.get('/:id',seguridad(), LoginXUsuario);
router.get('/buscar/:id',seguridad(), Buscar);
router.delete('/',seguridad(), Eliminar);
router.post('/', Login);
router.put('/',seguridad(), Modificar);
router.post('/crear/',seguridad(), Crear);

async function Login(req, res, next){
    try{
        const Item = await controlador.Login(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function LoginXUsuario(req, res, next){
    try{
        const Item = await controlador.LoginXUsuario(req.params.id);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Buscar(req, res, next){
    try{
        const Item = await controlador.Buscar(req.params.id);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Eliminar(req, res, next){
    try{
        const Item = await controlador.Eliminar(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Modificar(req, res, next){
    try {
        const Item = await controlador.Modificar(req.body);
        respuestas.success(req, res, Item, 200);
    } catch (err) {
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Crear(req, res, next){
    try {
        const Item = await controlador.Crear(req.body);
        respuestas.success(req, res, Item, 200);
    } catch (err) {
        respuestas.error(req, res, err, err.statusCode);
    }
}

export default router;