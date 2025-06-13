const success = function(rec, res, mensaje = '', status = 200){
    res.status(status).send({
    error:false,
    status:status,
    body:mensaje
})
}

const error = function(rec, res, mensaje = 'Error interno', status = 500){
    res.status(status).send({
        error:true,
        status:status,
        body:mensaje
    })
    }

const respuestas = {
    success,
    error
};

export default respuestas;