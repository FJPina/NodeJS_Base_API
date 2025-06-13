import sql from 'mssql';

function Listar(conn){
    return new Promise((resolve, reject) =>{
        conn.request()
        .execute('Usp_Rol_Obt', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Buscar(conn, IdRol){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdRol', sql.Int, IdRol)
        .execute('Usp_Rol_Bus', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Existe(conn, IdRol){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdRol', sql.Int, IdRol)
        .execute('Usp_Rol_Exi', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Eliminar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdRol', sql.Int, data.IdRol)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Rol_Eli', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Modificar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdRol', sql.Int, data.IdRol)
        .input('Descripcion', sql.VarChar, data.Descripcion)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Rol_Act', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Crear(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('Descripcion', sql.VarChar, data.Descripcion)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Rol_Ins', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

const RolDA = {
    Listar,
    Buscar,
    Existe,
    Eliminar,
    Modificar,
    Crear
};

export default RolDA;