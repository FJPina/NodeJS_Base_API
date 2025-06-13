import sqlserver from 'mssql';
import config from '../../config.js';

async function Connect(){

    try {
        const conn = await sqlserver.connect(config.sqlserver);
        return conn;
    } catch (error) {
        throw error;
    }
}

const sql = { Connect };

export default sql;