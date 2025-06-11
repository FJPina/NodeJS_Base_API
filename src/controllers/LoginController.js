const error = require('../middlewares/errors');
const bcrypt = require('bcrypt');
const auth = require('../utils/auth');
const mssql = require('../db/Connection/sqlserver');
const LoginDA = require('../db/DataAccess/LoginDA');


async function Login(data){
    let res, conn, Modulos;

    try {
        conn = await mssql.Connect();
        res = await LoginDA.BuscarXUsuario(conn, data);

    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }

    if(res.rowsAffected[1] == 0)
        throw new error('El correo no existe.');

    result = await bcrypt.compare(data.Contrasena, res.recordset[0].Contrasena)
    if(result){ 

        try {
            Modulos = await LoginDA.BuscarModulosXRol(conn, res.recordset[0].IdRol);
        } catch (err) {
            throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
        }

        const token = await auth.AsignarToken({Usuario: data.Usuario});    
        return  {"UsuarioMov": res.recordset[0].IdUsuario, "Modulos": Modulos.recordset, "Token" : token};
    }else{
        throw new error('La contraseña es incorrecta.');
    }
    
}

async function LoginXUsuario(id){
    try{
        const conn = await mssql.Connect();
        const res = await LoginDA.BuscarXIdUsuario(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
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
    }

    if(val.returnValue == 0)
         throw new error('El Login no existe.');

    try {        
        loginDel = await LoginDA.Eliminar(conn, data);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

async function Modificar(data){
    let conn, login, valLogin

    try {
        conn = await mssql.Connect();
        valLogin = await LoginDA.ExisteXId(conn, data.Login.IdLogin);
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
        
    if(valLogin.returnValue == 0)
        throw new error('No se encontró el registro.');

    try{
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
    }

    if(login.rowsAffected[1] == 0)
        throw new error('Ocurrió un error al modificar el Login.', 400);

}

async function Buscar(id){
    try{
        const conn = await mssql.Connect();
        const res = await LoginDA.Buscar(conn, id);
        return res.recordset;
    } catch (err) {
        throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
    }
}

module.exports = {
    Login,
    LoginXUsuario,
    Modificar,
    Crear,
    Eliminar,
    Buscar
}