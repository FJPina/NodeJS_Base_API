import error from '../utils/errors.js';
import mssql from '../db/Connection/sqlserver.js';
import ModuloDA from '../db/DataAccess/ModuloDA.js';

async function Listar(){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await ModuloDA.Listar(conn);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Buscar(id){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await ModuloDA.Buscar(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
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
    } finally{
        if (conn)
            await conn.close();
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
    } finally{
        if (conn)
            await conn.close();
    }

    if(val.returnValue == 0)
         throw new error('El módulo no existe.');

    try {
        conn = await mssql.Connect();
        moduloDel = await ModuloDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Modificar(data){
    let conn, Modulo, valMod

    try {
        conn = await mssql.Connect();
        valMod = await ModuloDA.Existe(conn, data.Modulo.IdModulo);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
        
    if(valMod.returnValue == 0)
        throw new error('No se encontró el registro.');

    try {
        conn = await mssql.Connect();
        const ModuloData = {
            IdModulo : data.Modulo.IdModulo,
            Descripcion : data.Modulo.Descripcion,
	        UsuarioMov: data.UsuarioMov
        };

        Modulo = await ModuloDA.Modificar(conn, ModuloData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(Modulo.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar el módulo.', 400);

}

const ModuloController = {
    Listar,
    Buscar,
    Eliminar,
    Modificar,
    Crear
};

export default ModuloController;