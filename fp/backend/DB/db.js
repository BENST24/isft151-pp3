import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"", 
    database: "isft151-pp3-proyecto",
    port: 3306
});
 
export { db };