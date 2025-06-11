const express = require('express');
const respuestas = require('../utils/respuestas');
const controlador = require('../controllers/UsuarioController');

const router = express.Router();
const seguridad = require('../middlewares/security');

//Rutas
router.get('/', Listar);
router.get('/:id', Buscar);
router.get('/detalle/:id', BuscarDetalle);
router.delete('/', Eliminar);
router.delete('/detalle', EliminarDetalle);
router.put('/', Modificar);
router.put('/detalle', ModificarDetalle);
router.post('/', Crear);
router.post('/detalle', CrearDetalle);

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

async function BuscarDetalle(req, res, next){
    try{
        const Item = await controlador.BuscarDetalle(req.params.id);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function CrearDetalle(req, res, next){
    try{
        const Item = await controlador.CrearDetalle(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Crear(req, res, next){
    try{
        const Item = await controlador.Crear(req.body);
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

async function ModificarDetalle(req, res, next){
    try{
        const Item = await controlador.ModificarDetalle(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Eliminar(req, res){
    try{
        const Item = await controlador.Eliminar(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function EliminarDetalle(req, res){
    try{
        const Item = await controlador.EliminarDetalle(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

module.exports = router;