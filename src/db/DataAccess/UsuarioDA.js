import sql from 'mssql';

function Listar(conn){
    return new Promise((resolve, reject) =>{
        conn.request()
        .execute('Usp_Usuario_Obt', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Buscar(conn, IdUsuario){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, IdUsuario)
        .execute('Usp_Usuario_Bus', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function BuscarCompleto(conn, IdUsuario){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, IdUsuario)
        .execute('Usp_UsuarioCompleto_Bus', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Crear(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('Nombre', sql.VarChar, data.Nombre)
        .input('ApPaterno', sql.VarChar, data.ApPaterno)
        .input('ApMaterno', sql.VarChar, data.ApMaterno)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Usuario_Ins', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Existe(conn, IdUsuario){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, IdUsuario)
        .execute('Usp_Usuario_Exi', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Eliminar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Usuario_Eli', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Modificar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('Nombre', sql.VarChar, data.Nombre)
        .input('ApPaterno', sql.VarChar, data.ApPaterno)
        .input('ApMaterno', sql.VarChar, data.ApMaterno)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Usuario_Act', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

const UsuarioDA = {
    Listar,
    Buscar,
    BuscarCompleto,
    Crear,
    Existe,
    Eliminar,
    Modificar
};

export default UsuarioDA;