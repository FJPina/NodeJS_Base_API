import error from '../utils/errors.js';
import mssql from '../db/Connection/sqlserver.js';
import RolDA from '../db/DataAccess/RolDA.js';

async function Listar(){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await RolDA.Listar(conn);
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
        const res = await RolDA.Buscar(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Crear(data){
    let conn, Rol

    try {

        conn = await mssql.Connect();

        const RolData = {
            Descripcion : data.Rol.Descripcion,
	        UsuarioMov: data.UsuarioMov
        };

        Rol = await RolDA.Crear(conn, RolData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(Rol.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar El Rol.', 400);
}

async function Eliminar(data){
    let conn, val, RolDel

    try {
        conn = await mssql.Connect();
        val = await RolDA.Existe(conn, data.IdRol);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }

    if(val.returnValue == 0)
         throw new error('El rol no existe.');

    try {
        conn = await mssql.Connect();
        RolDel = await RolDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Modificar(data){
    let conn, Rol, val

    try {
        conn = await mssql.Connect();
        val = await RolDA.Existe(conn, data.Rol.IdRol);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
        
    if(val.returnValue == 0)
        throw new error('No se encontró el registro.');

    try {
        conn = await mssql.Connect();
        const RolData = {
            IdRol : data.Rol.IdRol,
            Descripcion : data.Rol.Descripcion,
	        UsuarioMov: data.UsuarioMov
        };

        Rol = await RolDA.Modificar(conn, RolData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(Rol.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar el Rol.', 400);

}

const RolController ={
    Listar,
    Buscar,
    Eliminar,
    Modificar,
    Crear
};

export default RolController;