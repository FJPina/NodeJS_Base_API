const express = require('express');
const respuestas = require('../utils/respuestas');
const controlador = require('../controllers/UsuarioController');

const router = express.Router();
const seguridad = require('../middlewares/security');

//Rutas
router.get('/', Listar);
router.get('/:id', Buscar);
router.delete('/:id', Eliminar);
router.put('/', Modificar);
router.post('/', Crear);

//Funciones
async function Listar(req, res, next){
    try{
        const Listado = await controlador.Listar();
        respuestas.success(req, res, Listado, 200);
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

async function Crear(req, res, next){
    try{
        const Item = await controlador.CrearTransact(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Modificar(req, res, next){
    try{
        const Item = await controlador.Modificar(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Eliminar(req, res){
    try{
        const Item = await controlador.Eliminar(req.params.id);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

module.exports = router;