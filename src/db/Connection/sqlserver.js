const sqlserver = require('mssql');
const config = require('../../config');




async function Connect(){

    try {
        conn = await sqlserver.connect(config.sqlserver);
        return conn;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    
    Connect
}