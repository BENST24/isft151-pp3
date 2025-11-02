import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "", 
    database: process.env.DB_DATABASE || "isft151-pp3-proyecto",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos el pool directamente. Lo renombramos a 'db' para no tener que cambiarlo en todos los demás archivos.
export { pool as db };