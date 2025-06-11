const error = require('../middlewares/errors');
const bcrypt = require('bcrypt');
const mssql = require('../db/Connection/sqlserver');
const DireccionDA = require('../db/DataAccess/DireccionDA');

async function Crear(data){
    let conn, direccion

    try {

        conn = await mssql.Connect();

        const direccionData = {
            IdUsuario : data.Direccion.IdUsuario,
	        Calle : data.Direccion.Calle,
	        NumeroExt : data.Direccion.NumeroExt,
	        NumeroInt : data.Direccion.NumeroInt,
	        Colonia : data.Direccion.Colonia,
	        Municipio : data.Direccion.Municipio,
	        Estado : data.Direccion.Estado,
	        CP : data.Direccion.CP,
	        UsuarioMov: data.UsuarioMov
        };

        direccion = await DireccionDA.Crear(conn, direccionData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    }

    if(direccion.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar la dirección.', 400);
}

async function Eliminar(data){
    let conn, val, direccionDel

    try {
        conn = await mssql.Connect();
        val = await DireccionDA.Existe(conn, data.IdDireccion);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }

    if(val.returnValue == 0)
         throw new error('La dirección no existe.');

    try {
        direccionDel = await DireccionDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

async function Modificar(data){
    let conn, direccion, valDir

    try {
        conn = await mssql.Connect();
        valDir = await DireccionDA.Existe(conn, data.Direccion.IdDireccion);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
        
    if(valDir.returnValue == 0)
        throw new error('No se encontró el registro.');

    try {
        const direccionData = {
            IdDireccion : data.Direccion.IdDireccion,
            IdUsuario : data.Direccion.IdUsuario,
	        Calle : data.Direccion.Calle,
	        NumeroExt : data.Direccion.NumeroExt,
	        NumeroInt : data.Direccion.NumeroInt,
	        Colonia : data.Direccion.Colonia,
	        Municipio : data.Direccion.Municipio,
	        Estado : data.Direccion.Estado,
	        CP : data.Direccion.CP,
	        UsuarioMov: data.UsuarioMov
        };

        direccion = await DireccionDA.Modificar(conn, direccionData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    }

    if(direccion.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar la dirección.', 400);

}

async function DireccionXUsuario(id){
    try{
        const conn = await mssql.Connect();
        const res = await DireccionDA.BuscarXUsuario(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

async function Buscar(id){
    try{
        const conn = await mssql.Connect();
        const res = await DireccionDA.BuscarXUsuario(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

module.exports = {
    Crear,
    Eliminar,
    Modificar,
    Buscar,
    DireccionXUsuario
}