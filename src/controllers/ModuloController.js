const error = require('../utils/errors');
const mssql = require('../db/Connection/sqlserver');
const ModuloDA = require('../db/DataAccess/ModuloDA');

async function Listar(){
    try{
        const conn = await mssql.Connect();
        const res = await ModuloDA.Listar(conn);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

async function Buscar(id){
    try{
        const conn = await mssql.Connect();
        const res = await ModuloDA.Buscar(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

async function Crear(data){
    let conn, Modulo

    try {

        conn = await mssql.Connect();

        const ModuloData = {
            Descripcion : data.Modulo.Descripcion,
	        UsuarioMov: data.UsuarioMov
        };

        Modulo = await ModuloDA.Crear(conn, ModuloData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    }

    if(Modulo.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar el módulo.', 400);
}

async function Eliminar(data){
    let conn, val, moduloDel

    try {
        conn = await mssql.Connect();
        val = await ModuloDA.Existe(conn, data.IdModulo);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }

    if(val.returnValue == 0)
         throw new error('El módulo no existe.');

    try {
        moduloDel = await ModuloDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

async function Modificar(data){
    let conn, Modulo, valMod

    try {
        conn = await mssql.Connect();
        valMod = await ModuloDA.Existe(conn, data.Modulo.IdModulo);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
        
    if(valMod.returnValue == 0)
        throw new error('No se encontró el registro.');

    try {
        const ModuloData = {
            IdModulo : data.Modulo.IdModulo,
            Descripcion : data.Modulo.Descripcion,
	        UsuarioMov: data.UsuarioMov
        };

        Modulo = await ModuloDA.Modificar(conn, ModuloData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    }

    if(Modulo.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar el módulo.', 400);

}

module.exports = {
    Listar,
    Buscar,
    Eliminar,
    Modificar,
    Crear
}