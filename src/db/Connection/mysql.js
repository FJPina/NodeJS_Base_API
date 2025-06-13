import mysql from 'mysql2';
import config from '../../config.js';

const dbConfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbConfig);

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log(['Conexion exitosa!']);
        }
    });

    conexion.on('error', err =>{
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function Listar(tabla){
    return new Promise((resolve, reject) =>{
        conexion.query(`select * from ${tabla};`, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Buscar(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`select * from ${tabla} where ?`, [data], (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Crear(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`insert into ${tabla} set ? on duplicate key update ?`, [data, data], (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Eliminar(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`delete from ${tabla} where ?`, [data], (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function Query(consulta){
    return new Promise((resolve, reject) => {
        conexion.query(consulta, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

const sql = {
    Listar,
    Buscar,
    Crear,
    Eliminar,
    Query
}

export default sql;