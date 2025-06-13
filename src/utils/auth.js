import config from '../config.js';
import error from '../utils/errors.js';
import {SignJWT, jwtVerify} from 'jose';

const encoder = new TextEncoder();
const secret = encoder.encode(config.jwt.secret);


async function AsignarToken(data){

    var JWTObj = new SignJWT(data);
    const Token = await JWTObj.setProtectedHeader({alg: "HS256", typ: "JWT"}).setIssuedAt().setExpirationTime('3h').sign(secret);
    return Token;
}

async function verificarToken(token){
    const {payload} = await jwtVerify (token, secret);
    return payload;
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

    // Se utilizaba para validar el token guardado en base // const comparado = await compararToken(token, req.body.Correo);

    return token;
}

async function validarToken(req){
    let verificado;
    const autorizacion = req.headers.authorization || '';
    const token = await obtenerToken(req);
    return verificado = await verificarToken(token);
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

const auth = {
    AsignarToken,
    validarToken
};

export default auth;