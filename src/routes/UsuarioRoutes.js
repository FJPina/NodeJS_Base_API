import express from 'express';
import respuestas from '../utils/respuestas.js';
import controlador from '../controllers/UsuarioController.js';
import seguridad from '../middlewares/security.js';

const router = express.Router();

//Rutas
router.get('/', seguridad(), Listar);
router.get('/:id', seguridad(), Buscar);
router.get('/detalle/:id', seguridad(), BuscarDetalle);
router.delete('/', seguridad(), Eliminar);
router.delete('/detalle', seguridad(), EliminarDetalle);
router.put('/', seguridad(), Modificar);
router.put('/detalle', seguridad(), ModificarDetalle);
router.post('/', seguridad(), Crear);
router.post('/detalle', seguridad(), CrearDetalle);

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

export default router;