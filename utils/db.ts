import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    namedPlaceholders: true,
    host: process.env.HOST,
    // port: Number(process.env.PORT),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
    maxIdle: 10,
    idleTimeout: 60000
});

export const connection = await db.getConnection();