// const Prisma = require('@prisma/client');
// const prisma = new Prisma.PrismaClient();
// const error = require('../middlewares/errors');

// async function Crear(data){
//     try {console.log('----------------------',data)
//         return await prisma.sesion.create({
//             data : {
//                 Correo : data.Correo,
//                 Token : data.Token
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Existe(Correo){
//     let sesiones;
//     try{
//         sesiones = await prisma.sesion.count({
//             where: {
//                 Correo : Correo
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
//     return sesiones > 0 ? true : false;
// }

// async function Buscar(Correo){
//         return await prisma.sesion.findFirstOrThrow({
//             where: {
//                 Correo : Correo
//             }
//         }).catch(() => { throw new error('No se encontró una sesión activa', 404); });

// }

// async function Eliminar(Correo){
//     if(await prisma.sesion.count({ where: {Correo: Correo}}) == 0) throw new error("Registro no encontrado", 404);
//     try {
//         return prisma.sesion.delete({
//             where: {
//                 Correo: Correo
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function ExisteCorreo(Correo){
//     let logins;
//     try{
//         logins = await prisma.login.count({
//             where: {
//                 Correo : Correo
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
//     return logins > 0 ? true : false;
// }

// module.exports = {
//     Crear,
//     Buscar,
//     Eliminar, 
//     Existe,
//     ExisteCorreo
// };