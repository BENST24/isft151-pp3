import { authenticateUser } from "./AuthModel.js";
import { getActivityById } from "../Services/ActivityService.js";
import { getAllWorkingDaysDB } from "../Services/WorkingDayService.js"
import { getBookedSlotsByMonth, getBookedSlotsByDay, getAppointmentByDateTime, getAppointmentsByDate, 
         updateClientData, rescheduleAppointmentDB, isSlotAvailable, createAppointmentDB, cancelAppointment,
         getAppointmentByDateTimeActivity, getFutureAppointments, getAllAppointments } from '../Services/AppointmentService.js';


// --- Funciones Auxiliares de Lógica de Negocio ---

/**
 * Convierte un string 'HH:MM:SS' a minutos totales.
 */
function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m, s] = timeStr.split(':').map(Number);
    return (h * 60) + m + (s ? s / 60 : 0);
}

/**
 * Convierte minutos totales a un string 'HH:MM:SS'.
 */
function minutesToTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
    const minutes = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
}

/**
 * Formatea un objeto Date de JS a un string 'YYYY-MM-DD' para SQL.
 */
function formatDateToSQL(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Devuelve el nombre del día (en inglés, mayúsculas) de un objeto Date.
 */
function getDayName(date) {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return days[date.getDay()]; // getDay() devuelve 0 para Domingo
}

/**
 * LÓGICA DE NEGOCIO (Dinámica):
 * Genera todos los horarios posibles basándose en los días laborables 
 * y la duración de la actividad.
 */
function generatePossibleSlots(startDate, endDate, workingDays, activityDurationStr) {
    const possibleSlots = [];

    // Convertir duración a minutos (ej. '01:00:00' -> 60)
    const durationInMinutes = timeToMinutes(activityDurationStr);
    if (durationInMinutes === 0) {
        return []; // Evita bucles infinitos si la duración es 0
    }

    // Crear un Map para búsqueda rápida de horarios por día
    // Ej: { 'MONDAY': { start: 540, end: 1020 }, 'TUESDAY': ... }
    const workHoursMap = new Map();
    for (const day of workingDays) {
        workHoursMap.set(day.day, {
            start: timeToMinutes(day.start_hour),
            end: timeToMinutes(day.end_hour)
        });
    }

    // 3. Iterar cada día en el rango (ej. los próximos 30 días)
    let currentDate = new Date(startDate.getTime());
    endDate.setHours(23, 59, 59); // Asegurarse que incluya el último día

    while (currentDate <= endDate) {
        const dayName = getDayName(currentDate); // 'MONDAY', 'TUESDAY', etc.
        const workHours = workHoursMap.get(dayName); // Busca si este día se trabaja

        // Si es un día laborable
        if (workHours) {
            const dateSQL = formatDateToSQL(currentDate);

            // Generar slots desde la hora de inicio hasta la hora de fin
            let currentSlotStartMinutes = workHours.start;

            // Itera mientras el inicio + duración no se pase de la hora de fin
            while (currentSlotStartMinutes + durationInMinutes <= workHours.end) {

                possibleSlots.push({
                    data: dateSQL,
                    hour: minutesToTime(currentSlotStartMinutes)
                });

                // Moverse al siguiente slot
                currentSlotStartMinutes += durationInMinutes;
            }
        }

        // Avanzar al día siguiente
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return possibleSlots;
}


// --- Función Principal del Manager ---

/**
 * Devuelve la disponibilidad para una actividad en los próximos 30 días.
 */
export async function availabilityByActivity(currentUsername, currentUserPassword, idActivity)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación de entrada
        if (!idActivity) {
            api_return.result = 'MISSING_ACTIVITY_ID';
            return api_return;
        }
        
        // Obtener duración de la actividad
        const activity = await getActivityById(idActivity); 
        if (!activity) {
            api_return.result = 'ACTIVITY_NOT_FOUND';
            return api_return;
        }
        const activityDuration = activity.duration; // Ej: '01:00:00'

        // Obtener días y horas laborables
        const workDays = await getAllWorkingDaysDB(); // (Usando el Service/DB)
        if (!workDays || workDays.length === 0) {
            api_return.result = 'NO_WORKING_DAYS_FOUND';
            return api_return;
        }

        // Definir el rango (Próximos 30 días)
        const startDate = new Date(); // Hoy
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30); // Hoy + 30 días

        // Generar todos los slots posibles (Lógica de este Manager)
        const allPossibleSlots = generatePossibleSlots(startDate, endDate, workDays, activityDuration);

        // Obtener slots OCUPADOS (Llamada al Modelo de Citas)
        const sqlStartDate = formatDateToSQL(startDate);
        const sqlEndDate = formatDateToSQL(endDate);
        
        const bookedSlots = await getBookedSlotsByMonth(idActivity, sqlStartDate, sqlEndDate);

        // Filtrar (Posibles - Ocupados = Disponibles)
        
        // Convertir ocupados a un Set para búsquedas rápidas 'YYYY-MM-DDTHH:MM:SS'
        const bookedSet = new Set(bookedSlots.map(slot => {
            // Formatear la fecha que viene de la DB (puede ser Date o string)
            const dateSQL = (slot.data instanceof Date) ? formatDateToSQL(slot.data) : slot.data.split('T')[0];
            return `${dateSQL}T${slot.hour}`; 
        }));

        // Filtramos los posibles: nos quedamos solo con los que NO están en el Set de ocupados
        const availableSlots = allPossibleSlots.filter(slot => {
            const slotKey = `${slot.data}T${slot.hour}`;
            return !bookedSet.has(slotKey);
        });

        api_return.status = true;
        api_return.respond = availableSlots; // La lista de {data, hour} disponibles
        api_return.result = 'REQUEST_SUCCESSFUL';
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Devuelve la disponibilidad para una actividad en un día específico.
 */
export async function availabilityByDay(currentUsername, currentUserPassword, idActivity, date)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación de entradas
        if (!idActivity) {
            api_return.result = 'MISSING_ACTIVITY_ID';
            return api_return;
        }
        if (!date) {
            api_return.result = 'MISSING_DATE';
            return api_return;
        }

        // Obtener Reglas de Negocio (Services)
        
        // Actividad (Duración)
        const activity = await getActivityById(idActivity); 
        if (!activity) {
            api_return.result = 'ACTIVITY_NOT_FOUND';
            return api_return;
        }
        const activityDuration = activity.duration;

        // Días laborables (Horarios)
        const workDays = await getAllWorkingDaysDB();
        if (!workDays || workDays.length === 0) {
            api_return.result = 'NO_WORKING_DAYS_FOUND';
            return api_return;
        }

        // Definir el rango (Solo 1 día)
        // Aseguramos que la fecha se interprete en la zona horaria local
        const specificDateObj = new Date(date + 'T00:00:00'); 
        const sqlDate = formatDateToSQL(specificDateObj); // 'YYYY-MM-DD'

        // Generar slots posibles (Usando la helper function)
        // Pasamos la misma fecha como inicio y fin
        const allPossibleSlots = generatePossibleSlots(specificDateObj, specificDateObj, workDays, activityDuration);

        // Obtener slots OCUPADOS (Servicio de Citas)
        // Usamos la función optimizada para 1 día
        const bookedSlots = await getBookedSlotsByDay(idActivity, sqlDate); 
        // bookedSlots es un array de horas ['10:00:00', '14:00:00']

        // Filtrar (Posibles - Ocupados = Disponibles)
        
        // Convertimos las horas ocupadas a un Set para búsqueda rápida
        const bookedSet = new Set(bookedSlots); // Set {'10:00:00', '14:00:00'}

        const availableSlots = allPossibleSlots.filter(slot => {
            // Como allPossibleSlots solo tiene slots de ese día, solo chequeamos la hora
            return !bookedSet.has(slot.hour);
        });

        api_return.status = true;
        api_return.respond = availableSlots;
        api_return.result = 'REQUEST_SUCCESSFU';
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Busca un turno específico por fecha y hora.
 */
export async function serachAppointmentByDateTime(currentUsername, currentUserPassword, date, time)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    // Autenticación
    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación
        if (!date || !time) {
            api_return.result = 'MISSING_DATE_OR_TIME';
            return api_return;
        }

        // Llamada al servicio
        const appointment = await getAppointmentByDateTime(date, time);

        // Respuesta
        if (appointment) {
            api_return.status = true;
            api_return.respond = appointment;
            api_return.result = 'APPOINTMENT_FOUND';
        } else {
            api_return.result = 'APPOINTMENT_NOT_FOUND';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Busca todos los turnos de una fecha específica.
 */
export async function serachAppointmentByDate(currentUsername, currentUserPassword, date)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación
        if (!date) {
            api_return.result = 'MISSING_DATE';
            return api_return;
        }
        
        // Llamada al servicio
        const appointments = await getAppointmentsByDate(date);

        // Respuesta
        if (appointments && appointments.length > 0) {
            api_return.status = true;
            api_return.respond = appointments;
            api_return.result = 'APPOINTMENTS_FOUND';
        } else {
            // Nota: No encontrar turnos no es un error, 
            // pero podemos notificar que la búsqueda fue exitosa y no arrojó nada.
            api_return.result = 'NO_APPOINTMENTS_FOUND_FOR_DATE';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Modifica los datos del cliente de un turno específico.
 * (Identifica el turno por oldDate y oldTime).
 */
export async function modifyDataClient(currentUsername, currentUserPassword, oldDate, oldTime, newNameClient, newSurnameClient, newDniClient)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    // Autenticación
    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación
        if (!oldDate || !oldTime || !newNameClient || !newSurnameClient || !newDniClient) {
            api_return.result = 'MISSING_DATA';
            return api_return;
        }

        // Buscar el turno para obtener su ID
        const appointment = await getAppointmentByDateTime(oldDate, oldTime);
        if (!appointment) {
            api_return.result = 'APPOINTMENT_NOT_FOUND';
            return api_return;
        }
        
        // Llamar al servicio de actualización con el ID
        const affectedRows = await updateClientData(appointment.id, newNameClient, newSurnameClient, newDniClient);

        // Respuesta
        if (affectedRows > 0) {
            api_return.status = true;
            api_return.result = 'APPOINTMENT_CLIENT_DATA_UPDATED';
        } else {
            api_return.result = 'UPDATE_FAILED'; // No debería pasar si el ID se encontró, pero por si acaso.
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Reagenda un turno a una nueva fecha y hora.
 * (Identifica el turno por oldDate y oldTime).
 */
export async function rescheduleAppointment(currentUsername, currentUserPassword, oldDate, oldTime, newDate, newTime)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    // Autenticación
    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación
        if (!oldDate || !oldTime || !newDate || !newTime) {
            api_return.result = 'MISSING_DATA';
            return api_return;
        }

        // Buscar el turno actual (para obtener ID y ID de Actividad)
        const appointment = await getAppointmentByDateTime(oldDate, oldTime);
        if (!appointment) {
            api_return.result = 'APPOINTMENT_NOT_FOUND';
            return api_return;
        }

        // Verificar disponibilidad del NUEVO horario
        // Usamos la función auxiliar 'isSlotAvailable' del servicio
        const idActivity = appointment.id_activity;
        const available = await isSlotAvailable(newDate, newTime, idActivity);

        if (!available) {
            api_return.result = 'SLOT_NOT_AVAILABLE';
            return api_return;
        }

        // Llamar al servicio de reagendamiento
        const affectedRows = await rescheduleAppointmentDB(appointment.id, newDate, newTime);

        // Respuesta
        if (affectedRows > 0) {
            api_return.status = true;
            api_return.result = 'APPOINTMENT_RESCHEDULED';
        } else {
            api_return.result = 'RESCHEDULE_FAILED';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}


/**
 * Crea un nuevo turno (previa verificación de disponibilidad).
 */
export async function createAppointment(currentUsername, currentUserPassword, nameClient, surnameClient, dni, data, hour, idActivity)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación de datos de entrada
        if (!nameClient || !surnameClient || !dni || !data || !hour || !idActivity) {
            api_return.result = 'MISSING_DATA';
            return api_return;
        }

        // 3. Validación de Negocio: ¿Existe la actividad?
        // (Evita errores de Foreign Key)
        const activity = await getActivityById(idActivity); 
        if (!activity) {
            api_return.result = 'ACTIVITY_NOT_FOUND';
            return api_return;
        }

        // Validación de Negocio: ¿Está disponible el turno?
        // (Usamos la helper function 'isSlotAvailable' del servicio)
        const available = await isSlotAvailable(data, hour, idActivity);

        if (!available) {
            api_return.result = 'SLOT_NOT_AVAILABLE';
            return api_return; // El turno está ocupado
        }

        // Creación (Llamada al servicio)
        // Usamos 'createAppointmentDB' (el import renombrado)
        const newAppointmentId = await createAppointmentDB(nameClient, surnameClient, dni, data, hour, idActivity);

        // Respuesta
        if (newAppointmentId) {
            api_return.status = true;
            api_return.respond = { id: newAppointmentId }; // Devolver el ID del nuevo turno
            api_return.result = 'APPOINTMENT_CREATED';
        } else {
            api_return.result = 'CREATE_APPOINTMENT_FAILED'; // Si la DB falla
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Cancela un turno específico (identificado por fecha, hora y actividad).
 * Solo actúa si el turno no está ya cancelado.
 */
export async function CanceledAppointment(currentUsername, currentUserPassword, date, time, idActivity) // <-- PARÁMETRO AÑADIDO
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    // Autenticación
    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Validación
        if (!date || !time || !idActivity) { // <-- VALIDACIÓN AÑADIDA
            api_return.result = 'MISSING_DATA';
            return api_return;
        }

        // Buscar el turno usando la NUEVA función de servicio
        const appointment = await getAppointmentByDateTimeActivity(date, time, idActivity);

        if (!appointment) {
            api_return.result = 'APPOINTMENT_NOT_FOUND';
            return api_return;
        }

        // Verificar la lógica de negocio (esto ya estaba bien)
        if (appointment.state === 'CANCELED') {
            api_return.result = 'APPOINTMENT_ALREADY_CANCELED';
            return api_return; 
        }

        // Llamar al servicio de cancelación (usando el ID)
        const affectedRows = await cancelAppointment(appointment.id);

        // Respuesta
        if (affectedRows > 0) {
            api_return.status = true;
            api_return.result = 'APPOINTMENT_CANCELED';
        } else {
            api_return.result = 'CANCEL_FAILED';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Obtiene un listado de todos los turnos desde el día de la fecha en adelante
 * (que no estén cancelados).
 */
export async function listFutureAppointments(currentUsername, currentUserPassword)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    // Autenticación
    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Llamada al servicio
        const appointments = await getFutureAppointments();

        // Respuesta
        // (Devolvemos status: true aunque esté vacío, la consulta fue exitosa)
        api_return.status = true; 

        if (appointments && appointments.length > 0) {
            api_return.respond = appointments;
            api_return.result = 'FUTURE_APPOINTMENTS_FOUND';
        } else {
            api_return.respond = []; // Devolver array vacío
            api_return.result = 'NO_FUTURE_APPOINTMENTS_FOUND';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

/**
 * Obtiene un listado histórico de TODOS los turnos en la base de datos.
 */
export async function listAllAppointments(currentUsername, currentUserPassword)
{
    let api_return = 
    {
        status: false,
        respond: null,
        result: null,
    };

    // Autenticación
    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        // Llamada al servicio
        const appointments = await getAllAppointments();

        // Respuesta
        api_return.status = true;

        if (appointments && appointments.length > 0) {
            api_return.respond = appointments;
            api_return.result = 'ALL_APPOINTMENTS_FOUND';
        } else {
            api_return.respond = [];
            api_return.result = 'NO_APPOINTMENTS_FOUND'; // Historial vacío
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}