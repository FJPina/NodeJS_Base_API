import auth from "../utils/auth.js";
import respuestas from '../utils/respuestas.js';

export default function validarToken(){
    function middleware(req, res, next){
        const Item = auth.validarToken(req).then(()=>{
            next();
        }).catch((err)=>{
            respuestas.error(req, res, err, err.statusCode)
        });
    }
    return middleware
}