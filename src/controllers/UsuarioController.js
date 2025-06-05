// const Prisma = require('@prisma/client');
// const prisma = new Prisma.PrismaClient();
// const error = require('../middlewares/errors');
// const sesion = require('../controllers/SesionController');

// async function Listar(){
//     try{
//         return await prisma.Usuario.findMany();
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Buscar(id){
//     try{
//         return await prisma.Usuario.findUnique({
//             where: {
//                 IdUsuario : parseInt(id)
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Eliminar(id){
//     try{
//         return await prisma.Usuario.delete({
//             where: {
//                 IdUsuario: parseInt(id)
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Modificar(data){
//     try {
//         return await prisma.Usuario.update({
//             where:{
//                 IdUsuario : data.IdUsuario
//             },
//             data:{
//                 Nombre :data.Nombre,
//                 FechaSorteo : new Date(Date.parse(data.FechaSorteo)) ,
//                 Estatus : data.Estatus,
//                 FechaActualizacion : new Date()
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function closeCon(){
//     await prisma.$disconnect()
// }

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

// module.exports = {
//     Listar,
//     Buscar,
//     Eliminar,
//     Crear,
//     Modificar
// };