const express = require('express');
const respuestas = require('../utils/respuestas');
const controlador = require('../controllers/DireccionController');
const router = express.Router();
const seguridad = require('../middlewares/security');

//Rutas
router.get('/:id', seguridad(), DireccionXUsuario);
router.get('/buscar/:id', seguridad(), Buscar);
router.delete('/', seguridad(), Eliminar);
router.put('/', seguridad(), Modificar);
router.post('/', seguridad(), Crear);

async function DireccionXUsuario(req, res, next){
    try{
        const Item = await controlador.DireccionXUsuario(req.params.id);
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

module.exports = router;