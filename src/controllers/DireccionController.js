import error from '../utils/errors.js';
import mssql from '../db/Connection/sqlserver.js';
import DireccionDA from '../db/DataAccess/DireccionDA.js';

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
    } finally{
        if (conn)
            await conn.close();
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
    } finally{
        if (conn)
            await conn.close();
    }

    if(val.returnValue == 0)
         throw new error('La dirección no existe.');

    try {
        conn = await mssql.Connect();
        direccionDel = await DireccionDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Modificar(data){
    let conn, direccion, valDir

    try {
        conn = await mssql.Connect();
        valDir = await DireccionDA.Existe(conn, data.Direccion.IdDireccion);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
        
    if(valDir.returnValue == 0)
        throw new error('No se encontró el registro.');

    try {
        conn = await mssql.Connect();
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
    } finally{
        if (conn)
            await conn.close();
    }

    if(direccion.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar la dirección.', 400);

}

async function DireccionXUsuario(id){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await DireccionDA.BuscarXUsuario(conn, id);
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
        const res = await DireccionDA.BuscarXUsuario(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

const DireccionController = {
    Crear,
    Eliminar,
    Modificar,
    Buscar,
    DireccionXUsuario
};

export default DireccionController;