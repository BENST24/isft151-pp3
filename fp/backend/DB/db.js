import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"1234", 
    database: "isft151-pp3-proyecto",
});
export { db };