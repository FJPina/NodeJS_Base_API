import sql from 'mssql';

function BuscarXUsuario(conn, IdUsuario){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, IdUsuario)
        .execute('Usp_Direccion_BusXUsuario', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Crear(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('Calle', sql.VarChar, data.Calle)
        .input('NumeroExt', sql.Int, data.NumeroExt)
        .input('NumeroInt', sql.VarChar, data.NumeroInt)
        .input('Colonia', sql.VarChar, data.Colonia)
        .input('Municipio', sql.VarChar, data.Municipio)
        .input('Estado', sql.VarChar, data.Estado)
        .input('CP', sql.VarChar, data.CP)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Direccion_Ins', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Eliminar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdDireccion', sql.Int, data.IdDireccion)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Direccion_Eli', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function EliminarXUsuario(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Direccion_EliXUsuario', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Existe(conn, IdDireccion){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdDireccion', sql.Int, IdDireccion)
        .execute('Usp_Direccion_Exi', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Modificar(conn, data){
    return new Promise((resolve, reject) =>{
        conn.request()
        .input('IdDireccion', sql.Int, data.IdDireccion)
        .input('IdUsuario', sql.Int, data.IdUsuario)
        .input('Calle', sql.VarChar, data.Calle)
        .input('NumeroExt', sql.Int, data.NumeroExt)
        .input('NumeroInt', sql.VarChar, data.NumeroInt)
        .input('Colonia', sql.VarChar, data.Colonia)
        .input('Municipio', sql.VarChar, data.Municipio)
        .input('Estado', sql.VarChar, data.Estado)
        .input('CP', sql.VarChar, data.CP)
        .input('UsuarioMov', sql.Int, data.UsuarioMov)
        .execute('Usp_Direccion_Act', (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

const DireccionDA = {
    BuscarXUsuario,
    Existe,
    Crear,
    Eliminar,
    EliminarXUsuario,
    Modificar
};

export default DireccionDA;