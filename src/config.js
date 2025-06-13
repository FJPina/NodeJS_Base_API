import "dotenv/config";

const config = {
    app:{
        port: process.env.PORT,
    },
    jwt:{
        secret: process.env.JWT_SECRET,
    },
    mysql:{
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    sqlserver:{
        server: process.env.MSSQL_HOST,
        // port: parseInt(process.env.MSSQL_PORT),
        user: process.env.MSSQL_USER,
        password: process.env.MSSQL_PASSWORD,
        database: process.env.MSSQL_DATABASE,
        options: {
            trustServerCertificate: true,
            Encrypt: false
        }
    }
}

export default config