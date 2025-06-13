import respuestas from '../utils/respuestas.js';

function errors(err, req, res, next){
    console.log('[error', err);
    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;
    const name = err.name || '';
    respuestas.error(req, res, message, status, name)
}

export default errors;