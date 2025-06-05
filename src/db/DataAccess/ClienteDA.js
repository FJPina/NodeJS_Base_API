

function Listar(conn, tabla){
    return new Promise((resolve, reject) =>{
        conn.request().query(`select * from ${tabla};`, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    Listar
}

// async function Crear(data){
//     const CreaUsuario = await prisma.Usuario.create({
//         data : {
//             Nombre : data.Usuario.Nombre,
//             ApPaterno : data.Usuario.ApPaterno,
//             ApMaterno : data.Usuario.ApMaterno,
//             Telefono : data.Usuario.Telefono,
//             Estatus : data.Usuario.Estatus,
//             FechaCreacion : new Date()
//         }
//     });

//     const CreaLog = await prisma.login.create({
//         data: {
//             Correo : data.Login.Correo,
//             Contrasena : data.Login.Contrasena,
//             IdTipoLogin : data.Login.IdTipoLogin,
//             Estatus : data.Login.Estatus,
//             FechaCreacion : new Date(),
//             IdUsuario : usr.IdUsuario
//         }
//     });

//     const CreaDir =  await prisma.direccion.create({
//         data: {
//             Calle : data.Direccion.Calle,
//             NumeroExt : data.Direccion.NumeroExt,
//             NumeroInt : data.Direccion.NumeroInt,
//             Colonia : data.Direccion.Colonia,
//             Municipio : data.Direccion.Municipio,
//             Estado : data.Direccion.Estado,
//             CP : data.Direccion.CP,
//             Estatus : data.Direccion.Estatus,
//             IdUsuario : usr.IdUsuario
//         }
//     });
    

//     return [
//         usr,
//         logi,
//         dir,
//       ] = await prisma.$transaction([
//         CreaUsuario,
//         CreaLog,
//         CreaDir,
//       ]).catch((err)=>{
//         console.log(err);
//       })
// }
