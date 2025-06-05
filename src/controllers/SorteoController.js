// const Prisma = require('@prisma/client');
// const prisma = new Prisma.PrismaClient();
// const error = require('../middlewares/errors');

// async function Listar(){
//     try{
//         return await prisma.Sorteo.findMany();
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Buscar(id){
//     try{
//         return await prisma.Sorteo.findUnique({
//             where: {
//                 IdSorteo : parseInt(id)
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Eliminar(id){
//     try{
//         return await prisma.Sorteo.delete({
//             where: {
//                 IdSorteo: parseInt(id)
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Crear(data){
//     try {
//         return await prisma.Sorteo.create({
//             data : {
//                 Nombre : data.Nombre,
//                 FechaSorteo : new Date(Date.parse(data.FechaSorteo)) ,
//                 Estatus : data.Estatus,
//                 FechaCreacion : new Date()
//             }
//         });
//     } catch (err) {
//         throw new error(err.message.substring(err.message.indexOf("Argument"), err.message.length), 400);
//     }
// }

// async function Modificar(data){
//     try {
//         return await prisma.Sorteo.update({
//             where:{
//                 IdSorteo : data.IdSorteo
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

// module.exports = {
//     Listar,
//     Buscar,
//     Eliminar,
//     Crear,
//     Modificar
// };
