function error(message, codigo, nombre = ""){
    let e = new Error();
    let nombreDef = "Se ha producido un error al procesar la solicitud."
    if(codigo){
        e.statusCode = codigo;
    }

    e.name = nombre !== "" ? nombre : nombreDef;

    if(message){
        e.cause = message;
    }
    return e;
}

export default error;