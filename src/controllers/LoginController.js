// const Prisma = require('@prisma/client');
// const prisma = new Prisma.PrismaClient();
// const error = require('../middlewares/errors');

// const bcrypt = require('bcrypt');
// const auth = require('../utils/auth');
// const sesion = require('./SesionController');


// async function iniciarSesion(data){
//     var usr;
    
//     if (await sesion.Existe(data.Correo)) throw new error('Ya cuenta con una sesion activa!', 400);

//     try{
//         usr = await prisma.login.findFirst({
//             where: {
//                 Correo : data.Correo
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }

//     if(usr != null){
//         return bcrypt.compare(data.Contrasena, usr.Contrasena).then(function(result) {
//             if(result){
//                 return sesion.Crear({Token: auth.AsignarToken({Correo: usr.Correo, Contrasena : usr.Contrasena}), Correo : usr.Correo});    
//             }else{
//                 throw new error('Credenciales invalidas');
//             }
//         });
//     }else{
//         throw new error('Correo no valido');
//     }

// }

// async function cerrarSesion(Correo){
//     return await sesion.Eliminar(Correo);
// }

// async function Buscar(id){
//     try{
//         return await prisma.login.findUnique({
//             where: {
//                 IdLogin : parseInt(id)
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Eliminar(id){
//     try{
//         return await prisma.login.delete({
//             where: {
//                 IdLogin: parseInt(id)
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Crear(data){
//     try {
//         return await prisma.login.create({
//             data : {
//                 Correo : data.Correo,
//                 Contrasena : await bcrypt.hash(data.Contrasena.toString(), 5),
//                 IdTipoLogin : data.IdTipoLogin,
//                 FechaCreacion : new Date(),
//                 Estatus : data.Estatus
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Modificar(data){
//     try {
//         return await prisma.login.update({
//             where:{
//                 IdLogin : data.IdLogin
//             },
//             data:{
//                 Correo : data.Correo,
//                 Contrasena :  await bcrypt.hash(data.Contrasena.toString(), 5),
//                 IdTipoLogin : data.IdTipoLogin,
//                 FechaActualizacion : new Date(),
//                 Estatus : data.Estatus
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function closeCon(){
//     await prisma.$disconnect()
// }

// module.exports = {
//     iniciarSesion,
//     cerrarSesion,
//     Buscar,
//     Eliminar,
//     Crear,
//     Modificar
// };
