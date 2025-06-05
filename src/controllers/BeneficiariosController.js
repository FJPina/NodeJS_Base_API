const respuestas = require('../utils/respuestas');
const mssql = require('../db/Connection/sqlserver');
const tabla = "Beneficiario";

//Funciones
async function Listar(req, res, next){
    try{
        const conn = await mssql.Connect();
        const Listado = await mssql.Listar(conn, tabla);
        respuestas.success(req, res, Listado, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

async function Buscar(req, res, next){
    try{
        const conn = await mssql.Connect();
        const Item = await mssql.Listar(conn, JSON.parse('{"Id' + tabla + '": ' + req.params.id +'}'));

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

async function Eliminar(req, res){
    try{
        const Item = await controlador.Eliminar(req.params.id);
        respuestas.success(req, res, Item, 200);
    }catch(err){
        respuestas.error(req, res, err, err.statusCode);
    }
}

module.exports = {
    Listar,
    Buscar,
    Crear,
    Modificar,
    Eliminar
}