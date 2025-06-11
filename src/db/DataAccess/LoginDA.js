const sql = require('mssql');

function Buscar(conn, IdLogin){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdLogin', sql.Int, IdLogin)
        .execute('Usp_Login_Bus', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function BuscarXUsuario(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('Usuario', sql.VarChar, data.Usuario)
        .execute('Usp_Login_BusXUsuario', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function BuscarXIdUsuario(conn, IdUsuario){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, IdUsuario)
        .execute('Usp_Login_BusXIdUsuario', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function BuscarModulosXRol(conn, IdRol){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdRol', sql.Int, IdRol)
        .execute('Usp_ModuloXRol_Bus', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Modificar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdLogin', sql.Int, data.IdLogin)
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('Usuario', sql.VarChar, data.Usuario)
        .input('Contrasena', sql.VarChar, data.Contrasena)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .input('IdRol', sql.Int, data.IdRol)
        .execute('Usp_Login_Act', (error, result) =>{
            return error ? reject(error): resolve(result);
        });
    });
}

function ExisteXUsuario(conn, Usuario){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('Usuario', sql.VarChar, Usuario)
        .execute('Usp_Login_Exi', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function ExisteXId(conn, IdLogin){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdLogin', sql.Int, IdLogin)
        .execute('Usp_Login_ExiXId', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Crear(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('Usuario', sql.VarChar, data.Usuario)
        .input('Contrasena', sql.VarChar, data.Contrasena)
        .input('IdRol', sql.Int, data.IdRol)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Login_Ins', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Eliminar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdLogin', sql.Int, data.IdLogin)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Login_Eli', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function EliminarXUsuario(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Login_EliXUsuario', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    Buscar,
    BuscarXUsuario,
    BuscarXIdUsuario,
    BuscarModulosXRol,
    Modificar,
    ExisteXUsuario,
    ExisteXId,
    Crear,
    Eliminar,
    EliminarXUsuario    
}