const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middlewares/errors');
// const sesion = require('../controllers/SesionController');
// const Prisma = require('@prisma/client');

// const prisma = new Prisma.PrismaClient();
const secret = config.jwt.secret;

function AsignarToken(data){
    return jwt.sign(data, secret);
}

function verificarToken(token){
    return jwt.verify(token, secret);
}

const validarToken = {
    confirmarToken: async function(req){
        const decodificado = await decodeHeader(req);
    }
}

async function confirmarToken(req){
        const decodificado = await decodeHeader(req);
    }

async function obtenerToken(req){
    const autorizacion = req.headers.authorization || '';

    if(!autorizacion){
        throw error('Token no recibido', 401);
    }

    if(autorizacion.indexOf('Bearer') == -1){
        throw error('Token con formato invalido', 401);
    }

    let token = autorizacion.replace('Bearer ', '');

    const comparado = await compararToken(token, req.body.Correo);

    return token;
}

async function decodeHeader(req){
    const autorizacion = req.headers.authorization || '';
    const token = await obtenerToken(req);
    const verificado = verificarToken(token);

    req.user = verificado;
    return verificado;
}

// async function compararToken(token, Correo){
//     if (await sesion.ExisteCorreo(Correo)) {
//         let res = await sesion.Buscar(Correo);
//         if(res.Token !== token){
//             throw new error('El token proporcionado no coincide', 401);
//         }
//     }else{
//         throw new error('No se encontró el correo solicitado', 404);
//     }    
// }

module.exports = {
    AsignarToken,
    validarToken,
    confirmarToken
}