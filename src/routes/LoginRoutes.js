const express = require('express');
const respuestas = require('../utils/respuestas');
const controlador = require('../controllers/LoginController');

const router = express.Router();
const seguridad = require('../middlewares/security');

//Rutas
router.post('/', Login);
router.delete('/', seguridad(), Logout);

async function Login(req, res, next){
    try{
        const Item = await controlador.iniciarSesion(req.body);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Logout(req, res, next){
    try{
        const Item = await controlador.cerrarSesion(req.body.Correo);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

module.exports = router;