import error from '../utils/errors.js';
import bcrypt from 'bcrypt';
import mssql from '../db/Connection/sqlserver.js';
import UsuarioDA from '../db/DataAccess/UsuarioDA.js';
import LoginDA from '../db/DataAccess/LoginDA.js';
import DireccionDA from '../db/DataAccess/DireccionDA.js';

async function Listar(){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await UsuarioDA.Listar(conn);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Buscar(IdUsuario){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await UsuarioDA.Buscar(conn, IdUsuario);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function BuscarDetalle(IdUsuario){
    let conn, usr, login, direccion
    try{
        conn = await mssql.Connect();
        usr = await UsuarioDA.Buscar(conn, IdUsuario);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(usr.rowsAffected[1] == 0)
        throw new error('El usuario no existe.', 404);

    try {
        conn = await mssql.Connect();
        login = await LoginDA.BuscarXIdUsuario(conn, IdUsuario);
        direccion = await DireccionDA.BuscarXUsuario(conn, IdUsuario);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    return {Usuario : usr.recordset, Login: login.recordset, Direccion: direccion.recordset};
}

async function Crear(data){
    let conn, usr

    try{
        conn = await mssql.Connect();
        const usrData = {Nombre : data.Usuario.Nombre, ApPaterno : data.Usuario.ApPaterno, ApMaterno : data.Usuario.ApMaterno, UsuarioMov : data.UsuarioMov};
        usr = await UsuarioDA.Crear(conn, usrData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(usr.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar el usuario.', 400);

}

async function CrearDetalle(data){
    let conn, usr, login, direccion, val

    try {
        conn = await mssql.Connect();
        val = await LoginDA.BuscarXUsuario(conn, data.Login.Usuario);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
        
    if(val.returnValue != 0)
        throw new error('Ya existe una cuenta con este Usuario');

    try{
        conn = await mssql.Connect();
        const usrData = {Nombre : data.Usuario.Nombre, ApPaterno : data.Usuario.ApPaterno, ApMaterno : data.Usuario.ApMaterno, UsuarioMov : data.UsuarioMov};
        usr = await UsuarioDA.Crear(conn, usrData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(usr.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar el usuario.', 400);

    try {
        conn = await mssql.Connect();
        const loginData = {
            IdUsuario : usr.recordset[0].IdUsuario,
	        Usuario : data.Login.Usuario,
	        Contrasena : await bcrypt.hash(data.Login.Contrasena.toString(), 5),
	        IdRol : data.Login.IdRol,
	        UsuarioMov : data.UsuarioMov
        };

        login = await LoginDA.Crear(conn, loginData);

        const direccionData = {
            IdUsuario : usr.recordset[0].IdUsuario,
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

    if(login.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar los datos de inicio.', 400);
    if(direccion.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar la dirección.', 400);
}

async function EliminarDetalle(data){
    let conn, val, usrDel, loginDel, direccionDel

    try {
        conn = await mssql.Connect();
        val = await UsuarioDA.Existe(conn, data.IdUsuario);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }

    if(val.returnValue == 0)
         throw new error('El usuario no existe.');

    try {   
        conn = await mssql.Connect();     
        usrDel = await UsuarioDA.Eliminar(conn, data);
        loginDel = await LoginDA.EliminarXUsuario(conn, data);
        direccionDel = await DireccionDA.EliminarXUsuario(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Eliminar(data){
    let conn, val, usrDel

    try {
        conn = await mssql.Connect();
        val = await UsuarioDA.Existe(conn, data.IdUsuario);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }

    if(val.returnValue == 0)
         throw new error('El usuario no existe.');

    try {     
        conn = await mssql.Connect();   
        usrDel = await UsuarioDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
}

async function Modificar(data){
    let conn, usr, valUsr

    try {
        conn = await mssql.Connect();
        valUsr = await UsuarioDA.Existe(conn, data.Usuario.IdUsuario);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
        
    if(valUsr.returnValue == 0)
        throw new error('No se encontró el registro.');

    try{
        conn = await mssql.Connect();
        const usrData = {IdUsuario : data.Usuario.IdUsuario, Nombre : data.Usuario.Nombre, ApPaterno : data.Usuario.ApPaterno, ApMaterno : data.Usuario.ApMaterno, UsuarioMov : data.UsuarioMov};
        usr = await UsuarioDA.Modificar(conn, usrData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(usr.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar el usuario.', 400);

}

async function ModificarDetalle(data){
    let conn, usr, login, direccion, valUsr, valDir, valLogin

    try {
        conn = await mssql.Connect();
        valLogin = await LoginDA.ExisteXId(conn, data.Login.IdLogin);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
        
    if(valLogin.returnValue == 0)
        throw new error('No se encontró el registro.');

    try{
        conn = await mssql.Connect();
        const loginData = {
            IdLogin : data.Login.IdLogin,
            IdUsuario : data.Login.IdUsuario,
	        Usuario : data.Login.Usuario,
	        Contrasena : await bcrypt.hash(data.Login.Contrasena.toString(), 5),
	        IdRol : data.Login.IdRol,
	        UsuarioMov : data.UsuarioMov
        };

        login = await LoginDA.Modificar(conn, loginData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(login.rowsAffected[0] == 0)
        throw new error('Ocurrió un error al modificar el Login.', 400);

    //Bloque USR
    try {
        conn = await mssql.Connect();
        valUsr = await UsuarioDA.Existe(conn, data.Usuario.IdUsuario);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }
        
    if(valUsr.returnValue == 0)
        throw new error('No se encontró el registro.');

    try{
        conn = await mssql.Connect();
        const usrData = {IdUsuario : data.Usuario.IdUsuario, Nombre : data.Usuario.Nombre, ApPaterno : data.Usuario.ApPaterno, ApMaterno : data.Usuario.ApMaterno, UsuarioMov : data.UsuarioMov};
        usr = await UsuarioDA.Modificar(conn, usrData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(usr.rowsAffected[0] == 0)
        throw new error('Ocurrió un error al modificar el usuario.', 400);

    //Bloque DIR
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
        throw new error('Ocurrió un error al modificar el la dirección.', 400);

}

const UsuarioController = {
    Listar,
    Buscar,
    BuscarDetalle,
    Crear,
    CrearDetalle,
    Eliminar,
    EliminarDetalle,
    Modificar,
    ModificarDetalle
};

export default UsuarioController;