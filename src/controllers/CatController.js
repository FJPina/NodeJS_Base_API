import { json } from 'express';

module.exports = function(dbIny){

    let db = dbIny;

    if(!db){
        db = import('../db/Connection/mysql.js');
    }

    function Listar(tabla){
        return db.Listar(tabla);
    }
    
    function Buscar(tabla, id){
        return db.Buscar(tabla, JSON.parse('{"Id' + tabla + '": ' + id +'}'));
    }
    
    function Eliminar(tabla, id){
        return db.Eliminar(tabla, JSON.parse('{"Id' + tabla + '": ' + id +'}'));
    }
    
    function Crear(tabla, data){
        return db.Crear(tabla, data);
    }
    
    async function Modificar(tabla, data){
        return db.Crear(tabla, data);
    }

    return {
        Listar,
        Buscar,
        Eliminar,
        Crear,
        Modificar
    }

}



