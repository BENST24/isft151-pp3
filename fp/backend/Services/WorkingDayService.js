import { db } from "../database/connection.js";

// Crear un día laboral
export async function createWorkingDayDB(day, start_hour, end_hour, id_activity) 
{
    await db.execute(
        `INSERT INTO working_day (day, start_hour, end_hour, id_activity)
         VALUES (?, ?, ?, ?)`,
        [day, start_hour, end_hour, id_activity]
    );
}

// Buscar un día laboral (por nombre del día)
export async function getWorkingDayDB(day) 
{
    const [rows] = await db.execute(
        `SELECT * FROM working_day WHERE day = ?`,
        [day]
    );
    return rows.length > 0 ? rows[0] : null;
}

// Modificar un día laboral (solo se actualizan horas y actividad)
export async function updateWorkingDayDB(day, new_start_hour, new_end_hour, new_id_activity)
{
    const [result] = await db.execute(
        `UPDATE working_day 
         SET start_hour = ?, end_hour = ?, id_activity = ?
         WHERE day = ?`,
        [new_start_hour, new_end_hour, new_id_activity, day]
    );
    return result.affectedRows > 0; // true si se actualizó algo
}

// Eliminar un día laboral (por nombre del día)
export async function deleteWorkingDayDB(day)
{
    const [result] = await db.execute(
        `DELETE FROM working_day WHERE day = ?`,
        [day]
    );
    return result.affectedRows > 0;
}

// Obtener todos los días laborales
export async function getAllWorkingDaysDB()
{
    const [rows] = await db.execute(`SELECT * FROM working_day`);
    return rows;
}
