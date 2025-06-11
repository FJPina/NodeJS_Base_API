const auth = require("../utils/auth");
const respuestas = require('../utils/respuestas');

module.exports = function validarToken(){
    function middleware(req, res, next){
        const Item = auth.validarToken(req).then(()=>{
            next();
        }).catch((err)=>{
            respuestas.error(req, res, err, err.statusCode)
        });
    }
    return middleware
}