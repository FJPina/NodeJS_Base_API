const respuestas = require('./respuestas');

function errors(err, req, res, next){
    console.log('[error', err);
    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;
    const name = err.name || '';
    respuestas.error(req, res, message, status, name)
}

module.exports = errors;