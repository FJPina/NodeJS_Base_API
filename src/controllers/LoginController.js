import error from '../utils/errors.js';
import bcrypt from 'bcrypt';
import auth from '../utils/auth.js';
import mssql from '../db/Connection/sqlserver.js';
import LoginDA from '../db/DataAccess/LoginDA.js';


async function Login(data){
    let res, conn, Modulos, result;

    try {
        conn = await mssql.Connect();
        res = await LoginDA.BuscarXUsuario(conn, data);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    } finally{
        if (conn)
            await conn.close();
    }

    if(res.rowsAffected[1] == 0)
        throw new error('El correo no existe.');

    result = await bcrypt.compare(data.Contrasena, res.recordset[0].Contrasena);
    
    if(result){ 

        try {
            conn = await mssql.Connect();
            Modulos = await LoginDA.BuscarModulosXRol(conn, res.recordset[0].IdRol);
        } catch (err) {
            throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
        }finally{
            if (conn)
                await conn.close();
        }   

        const token = await auth.AsignarToken({Usuario: data.Usuario});    
        return  {"UsuarioMov": res.recordset[0].IdUsuario, "Modulos": Modulos.recordset, "Token" : token};
    }else{
        throw new error('La contraseña es incorrecta.');
    }
    
}

async function LoginXUsuario(id){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await LoginDA.BuscarXIdUsuario(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }finally{
        if (conn)
            await conn.close();
    }
}

async function Crear(data){
    let conn, login

    try {
        conn = await mssql.Connect();
        
        const loginData = {
            IdUsuario : data.Login.IdUsuario,
	        Usuario : data.Login.Usuario,
	        Contrasena : await bcrypt.hash(data.Login.Contrasena.toString(), 5),
	        IdRol : data.Login.IdRol,
	        UsuarioMov : data.UsuarioMov
        };

        login = await LoginDA.Crear(conn, loginData);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 500);
    } finally{
        if (conn)
            await conn.close();
    }

    if(login.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al insertar los datos de inicio.', 400);
    
}

async function Eliminar(data){
    let conn, val, loginDel

    try {
        conn = await mssql.Connect();
        val = await LoginDA.ExisteXId(conn, data.IdLogin);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }finally{
        if (conn)
            await conn.close();
    }

    if(val.returnValue == 0)
         throw new error('El Login no existe.');

    try {        
        conn = await mssql.Connect();
        loginDel = await LoginDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }finally{
        if (conn)
            await conn.close();
    }
}

async function Modificar(data){
    let conn, login, val

    try {
        conn = await mssql.Connect();
        val = await LoginDA.ExisteXId(conn, data.Login.IdLogin);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }finally{
        if (conn)
            await conn.close();
    }
        
    if(val.returnValue == 0)
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

    if(login.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar el Login.', 400);

}

async function Buscar(id){
    let conn;
    try{
        conn = await mssql.Connect();
        const res = await LoginDA.Buscar(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }finally{
        if (conn)
            await conn.close();
    }
}

const LoginController = {
    Login,
    LoginXUsuario,
    Modificar,
    Crear,
    Eliminar,
    Buscar
};

export default LoginController;