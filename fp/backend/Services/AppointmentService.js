import { db } from "../DB/db.js";

/*
=================================================
  Disponibilidad (Funciones auxiliares para el Backend)
=================================================
*/

/**
 * Función auxiliar para verificar si un slot está ocupado.
 * Devuelve 'true' si está disponible, 'false' si está ocupado.
 */
export async function isSlotAvailable(date, hour, idActivity) {
    const sql = `
        SELECT COUNT(id) AS count 
        FROM appointment 
        WHERE date = ? 
          AND hour = ? 
          AND id_activity = ? 
          AND state IN ('PENDING', 'PENDING_RESCHEDULING');
    `;
    
    // db.execute devuelve [rows, fields]
    const [rows] = await db.execute(sql, [date, hour, idActivity]);
    
    // Si count es 0, está disponible
    return rows[0].count === 0; 
}

/**
 * Obtiene los turnos OCUPADOS en un rango de fechas para una actividad.
 * El backend debe usar esto para filtrar los horarios disponibles.
 */
export async function getBookedSlotsByMonth(idActivity, startDate, endDate) {
    const sql = `
        SELECT data, hour 
        FROM appointment 
        WHERE id_activity = ? 
          AND state IN ('PENDING', 'PENDING_RESCHEDULING') 
          AND data BETWEEN ? AND ?;
    `;
    
    const [rows] = await db.execute(sql, [idActivity, startDate, endDate]);
    return rows; 
}

/**
 * Obtiene las horas OCUPADAS para un día y actividad específicos.
 */
export async function getBookedSlotsByDay(idActivity, specificDate) {
    const sql = `
        SELECT hour 
        FROM appointment 
        WHERE id_activity = ? 
          AND state IN ('PENDING', 'PENDING_RESCHEDULING') 
          AND data = ?;
    `;
    
    const [rows] = await db.execute(sql, [idActivity, specificDate]);
    return rows.map(row => row.hour); // Devuelve [ '10:00:00', '14:00:00' ]
}


/*
=================================================
  Búsqueda de Turnos
=================================================
*/

/**
 * Busca un turno específico por fecha y hora.
 */
export async function getAppointmentByDateTime(data, hour) {
    const sql = `
        SELECT * FROM appointment 
        WHERE data = ? AND hour = ?;
    `;
    
    const [rows] = await db.execute(sql, [data, hour]);
    return rows[0] || null; // Devuelve el turno o null
}

/**
 * Busca todos los turnos de una fecha específica.
 */
export async function getAppointmentsByDate(data) {
    const sql = `
        SELECT * FROM appointment 
        WHERE data = ? 
        ORDER BY hour ASC;
    `;
    
    const [rows] = await db.execute(sql, [data]);
    return rows;
}

/**
 * Busca un turno específico por fecha, hora Y ACTIVIDAD.
 * Esto sí es un identificador único.
 */
export async function getAppointmentByDateTimeActivity(data, hour, idActivity) {
    const sql = `
        SELECT * FROM appointment 
        WHERE data = ? 
          AND hour = ? 
          AND id_activity = ?;
    `;
    
    const [rows] = await db.execute(sql, [data, hour, idActivity]);
    return rows[0] || null; // Devuelve el turno específico o null
}


/*
=================================================
  Creación de Turnos
=================================================
*/

/**
 * Crea un nuevo turno (asume que la disponibilidad ya fue verificada).
 * Devuelve el ID del nuevo turno.
 */
export async function createAppointmentDB(name, surname, dni, data, hour, idActivity) {
    const sql = `
        INSERT INTO appointment 
            (name_client, surname_client, dni, data, hour, id_activity) 
        VALUES 
            (?, ?, ?, ?, ?, ?);
    `;
    
    // db.execute devuelve [result, fields]
    const [result] = await db.execute(sql, [name, surname, dni, data, hour, idActivity]);
    
    return result.insertId; // Devuelve el ID del turno creado
}


/*
=================================================
  Modificación de Turnos
=================================================
*/

/**
 * Actualiza solo los datos del cliente de un turno por su ID.
 * Devuelve 1 si se actualizó, 0 si no se encontró.
 */
export async function updateClientData(id, name, surname, dni) {
    const sql = `
        UPDATE appointment 
        SET name_client = ?, surname_client = ?, dni = ? 
        WHERE id = ?;
    `;
    
    const [result] = await db.execute(sql, [name, surname, dni, id]);
    return result.affectedRows; 
}

/**
 * Reagenda un turno (cambia fecha/hora y estado) por su ID.
 * (Asume que la disponibilidad ya fue verificada).
 * Devuelve 1 si se actualizó, 0 si no se encontró.
 */
export async function rescheduleAppointmentDB(id, newData, newHour) {
    const sql = `
        UPDATE appointment 
        SET data = ?, hour = ?, state = 'PENDING_RESCHEDULING' 
        WHERE id = ?;
    `;
    
    const [result] = await db.execute(sql, [newData, newHour, id]);
    return result.affectedRows;
}


/*
=================================================
  Cancelación de Turnos
=================================================
*/

/**
 * Cancela un turno por su ID (cambia el estado).
 * Devuelve 1 si se actualizó, 0 si no se encontró.
 */
export async function cancelAppointment(id) {
    const sql = `
        UPDATE appointment 
        SET state = 'CANCELED' 
        WHERE id = ?;
    `;
    
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
}


/*
=================================================
  Listado de Turnos
=================================================
*/

/**
 * Obtiene todos los turnos desde la fecha actual en adelante (no cancelados).
 */
export async function getFutureAppointments() {
    const sql = `
        SELECT * FROM appointment 
        WHERE data >= CURDATE() 
          AND state != 'CANCELED' 
        ORDER BY data ASC, hour ASC;
    `;
    
    const [rows] = await db.execute(sql);
    return rows;
}

/**
 * Obtiene un historial de todos los turnos.
 */
export async function getAllAppointments() {
    const sql = `
        SELECT * FROM appointment 
        ORDER BY data DESC, hour DESC;
    `;
    
    const [rows] = await db.execute(sql);
    return rows;
}