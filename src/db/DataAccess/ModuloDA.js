import sql from 'mssql';

function Listar(conn){
    return new Promise((resolve, reject) =>{
        conn.request()
        .execute('Usp_Modulo_Obt', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Buscar(conn, IdModulo){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdModulo', sql.Int, IdModulo)
        .execute('Usp_Modulo_Bus', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Existe(conn, IdModulo){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdModulo', sql.Int, IdModulo)
        .execute('Usp_Modulo_Exi', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Eliminar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdModulo', sql.Int, data.IdModulo)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Modulo_Eli', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Modificar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdModulo', sql.Int, data.IdModulo)
        .input('Descripcion', sql.VarChar, data.Descripcion)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Modulo_Act', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Crear(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('Descripcion', sql.VarChar, data.Descripcion)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Modulo_Ins', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

const ModuloDA = {
    Listar,
    Buscar,
    Existe,
    Eliminar,
    Modificar,
    Crear
};

export default ModuloDA;