import { authenticateUser } from "./AuthModel.js";
import { createWorkingDayDB, getWorkingDayDB, updateWorkingDayDB, deleteWorkingDayDB, getAllWorkingDaysDB } from "../Services/WorkingDayService.js"
import { getActivityById } from "../Services/ActivityService.js";

function isAuthorizedUser(type)
{   
    if(type === 'SUPERVISOR')
    {
        return true;
    }else
    {
        return false;
    }
}


function isValidTimeFormat(timeString) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
    return regex.test(timeString);
}

function isStartBeforeEnd(start, end) {
    const toMinutes = t => {
        const [h, m, s] = t.split(':').map(Number);
        return h * 60 + m + (s ? s / 60 : 0);
    };
    return toMinutes(start) < toMinutes(end);
}

export async function createWorkingDay(currentUsername, currentUserPassword, day, start_hour, end_hour, id_activity)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            // Validar día
            const validDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
            if (!validDays.includes(day))
            {
                api_return.result = 'DAY_NOT_VALID';
                return api_return;
            }

            // Validar formato TIME
            if (!isValidTimeFormat(start_hour) || !isValidTimeFormat(end_hour))
            {
                api_return.result = 'INVALID_TIME_FORMAT';
                return api_return;
            }

            // Validar orden de horas
            if (!isStartBeforeEnd(start_hour, end_hour))
            {
                api_return.result = 'INVALID_TIME_ORDER';
                return api_return;
            }

            // Verificar que la actividad exista
            let activity = await getActivityById(id_activity);
            if (!activity)
            {
                api_return.result = 'ACTIVITY_NOT_FOUND';
                return api_return;
            }

            // Verificar que el día no esté ya ocupado
            if (await getWorkingDayDB(day))
            {
                api_return.result = 'DAY_NOT_AVAILABLE';
                return api_return;
            }

            // Crear día laboral
            await createWorkingDayDB(day, start_hour, end_hour, id_activity);

            api_return.status = true;
            api_return.result = 'WORKING_DAY_CREATED';
        }
        else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function searchWorkingDay(currentUsername, currentUserPassword, day)
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
        // Autorización
        if (isAuthorizedUser(respond.type))
        {
            // Validar nombre del día
            const validDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
            if (!validDays.includes(day))
            {
                api_return.result = 'DAY_NOT_VALID';
                return api_return;
            }

            // Buscar día laboral en la base
            const workingDay = await getWorkingDayDB(day);

            if (workingDay)
            {
                api_return.status = true;
                api_return.respond = workingDay;   // Se devuelve el objeto encontrado
                api_return.result = 'WORKING_DAY_FOUND';
            }
            else
            {
                api_return.result = 'WORKING_DAY_NOT_FOUND';
            }
        }
        else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function modifyWorkingDay(currentUsername, currentUserPassword, day, new_start_hour, new_end_hour, new_id_activity)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            // Validar nombre del día
            const validDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
            if (!validDays.includes(day))
            {
                api_return.result = 'DAY_NOT_VALID';
                return api_return;
            }

            // Validar formato de hora
            if (!isValidTimeFormat(new_start_hour) || !isValidTimeFormat(new_end_hour))
            {
                api_return.result = 'INVALID_TIME_FORMAT';
                return api_return;
            }

            // Validar orden de horas
            if (!isStartBeforeEnd(new_start_hour, new_end_hour))
            {
                api_return.result = 'INVALID_TIME_ORDER';
                return api_return;
            }

            // Verificar que la actividad exista
            let activity = await getActivityById(new_id_activity);
            if (!activity)
            {
                api_return.result = 'ACTIVITY_NOT_FOUND';
                return api_return;
            }

            // Verificar que el día exista en la base
            let existingDay = await getWorkingDayDB(day);
            if (!existingDay)
            {
                api_return.result = 'WORKING_DAY_NOT_FOUND';
                return api_return;
            }

            // Actualizar datos
            let updated = await updateWorkingDayDB(day, new_start_hour, new_end_hour, new_id_activity);

            if (updated)
            {
                api_return.status = true;
                api_return.result = 'WORKING_DAY_UPDATED';
            }
            else
            {
                api_return.result = 'UPDATE_FAILED';
            }
        }
        else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function deleteWorkingDay(currentUsername, currentUserPassword, day)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if (respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            // Validar nombre del día
            const validDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
            if (!validDays.includes(day))
            {
                api_return.result = 'DAY_NOT_VALID';
                return api_return;
            }

            // Verificar que exista en la base
            const existingDay = await getWorkingDayDB(day);
            if (!existingDay)
            {
                api_return.result = 'WORKING_DAY_NOT_FOUND';
                return api_return;
            }

            // Eliminar
            const deleted = await deleteWorkingDayDB(day);

            if (deleted)
            {
                api_return.status = true;
                api_return.result = 'WORKING_DAY_DELETED';
            }
            else
            {
                api_return.result = 'DELETE_FAILED';
            }
        }
        else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function listWorkingDay(currentUsername, currentUserPassword)
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
        if (isAuthorizedUser(respond.type))
        {
            const allDays = await getAllWorkingDaysDB();

            if (allDays.length > 0)
            {
                api_return.status = true;
                api_return.respond = allDays;
                api_return.result = 'WORKING_DAYS_FOUND';
            }
            else
            {
                api_return.result = 'NO_WORKING_DAYS_FOUND';
            }
        }
        else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }
    else
    {
        api_return.result = respond.result;
    }

    return api_return;
}