import express, { response } from "express";
import rateLimit from "express-rate-limit";
import { authenticateUser } from "../Managers/AuthModel.js";
import { createUser, deleteUser, enableBlockedUser, modifyUserPassword, modifyUserType, modifyUser, searchUser, listUser } from "../Managers/UserManager.js";
import { createActivity, deleteActivity, modifyActivity, searchActivity, listActivity } from "../Managers/ActivityManager.js"
import { createWorkingDay, searchWorkingDay, modifyWorkingDay, deleteWorkingDay, listWorkingDay } from "../Managers/WorkingDayManager.js";
import { availabilityByActivity, availabilityByDay, serachAppointmentByDateTime, serachAppointmentByDate, 
         modifyDataClient, rescheduleAppointment, createAppointment, CanceledAppointment, listFutureAppointments, listAllAppointments } from "../Managers/AppointmentManager.js";

const router = express.Router();

const jsonParser = express.json({ strict: true, type: "application/json" });

router.use(jsonParser, (err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) 
    {
        return res.status(400).json({ status: false, result: "INVALID_JSON_FORMAT" });
    }
    next();
});

// === Limitadores ===
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: { status: false, result: "TOO_MANY_LOGIN_ATTEMPTS" }
});

const userModificationLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: { status: false, result: "TOO_MANY_ATTEMPTS" }
});

function validateJsonInputStructureCreateUser(req) 
{
    const requiredFields = ["currentUsername", "currentUserPassword", "username", "password", "type"];
    const body = req.body;

    let response =
    {
        status: true,
        result: "VALID_JSON_STRUCTURE",
    }

    // Validar que el body exista
    if (!body || typeof body !== "object") 
    {
        response.status = false;
        response.result = "INVALID_JSON_STRUCTURE";
        return response;
    }

    // Recorrer los campos esperados
    for (const field of requiredFields) 
    {
        const value = body[field];

        // Campo faltante o null
        if (value === undefined || value === null) 
        {
            response.status = false;
            response.result = `${field.toUpperCase()}_NULL`;
            return response;
        }

        // Tipo incorrecto
        if (typeof value !== "string") 
        {
            response.status = false;
            response.result = `${field.toUpperCase()}_INVALID_DATA_TYPE`;
            return response;
        }

        // Validar type específicamente
        if (field === "type") 
        {
            const validTypes = ["SUPERVISOR", "RECEPTIONIST"];
            if (!validTypes.includes(value)) 
            {
                response.status = false;
                response.result = "INVALID_EMPLOYEE_TYPE";
                return response;
            }
        }
    }

    // Si pasa todas las validaciones
    return response;
}

// ----------------------------------------------------------------------------------------
// Endpoint de Autenticación 
// ----------------------------------------------------------------------------------------
router.post("/auth/login", loginLimiter, jsonParser, async (req, res) => {
    try
    {
        const { username, password } = req.body;

        const result = await authenticateUser(username, password);

        if (result.status) 
        {
          res.status(200).json(result);
        } else 
        {
          res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error en /auth/login: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

// ----------------------------------------------------------------------------------------
// Endpoints de Usuario
// ----------------------------------------------------------------------------------------

router.post("/user/create", userModificationLimiter, jsonParser, async (req, res) => {
    try {

        const validation = validateJsonInputStructureCreateUser(req);
        if (!validation.status) 
        {
            return res.status(400).json(validation);
        }

        const { currentUsername, currentUserPassword, username, password, type} = req.body;

        const result = await createUser( currentUsername, currentUserPassword, username, password, type);

        if (result.status) 
        {
            res.status(200).json(result);
        } else 
        {
            res.status(401).json(result);
        }

    } catch (error) {
        console.error("Error en /user/create: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.delete("/user/delete", userModificationLimiter, jsonParser, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, username} = req.body;

        const result = await deleteUser( currentUsername, currentUserPassword, username);

        if (result.status) 
        {
          res.status(200).json(result);
        } else 
        {
          res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error en /user/delete: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.patch("/user/modify/enable", userModificationLimiter, jsonParser, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword } = req.body;

        const { username } = req.params;

        const result = await enableBlockedUser( currentUsername, currentUserPassword, username);

        if (result.status) 
        {
          res.status(200).json(result);
        } else 
        {
          res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error en /user/enable: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.patch("/user/modify/password", userModificationLimiter, jsonParser, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, username, newPassword } = req.body;

        const result = await modifyUserPassword( currentUsername, currentUserPassword, username, newPassword);

        if (result.status) 
        {
          res.status(200).json(result);
        } else 
        {
          res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error en /user/modify/password: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.patch("/user/modify/type ", userModificationLimiter, jsonParser, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, username, newType } = req.body;

        const result = await modifyUserType( currentUsername, currentUserPassword, username, newType);

        if (result.status) 
        {
          res.status(200).json(result);
        } else 
        {
          res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error en /user/modify/type: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.patch("/user/modify", userModificationLimiter, jsonParser, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, username, newPassword, newType } = req.body;

        const result = await modifyUser( currentUsername, currentUserPassword, username, newPassword, newType);

        if (result.status)
        {
          res.status(200).json(result);
        } else 
        {
          res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error en /user/modify: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.get("/user/search", jsonParser, async (req, res) => {
    try {
        const currentUsername = req.headers["x-username"];
        const currentUserPassword = req.headers["x-password"];
        const { username } = req.query;

        const result = await searchUser(currentUsername, currentUserPassword, username);

        if (result.status)
          res.status(200).json(result);
        else
          res.status(401).json(result);

    } catch (error) {
        console.error("Error en /user/search: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


router.get("/user/list", jsonParser, async (req, res) => {
    try {
        const currentUsername = req.headers["x-username"];
        const currentUserPassword = req.headers["x-password"];

        const result = await listUser(currentUsername, currentUserPassword);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /user/list: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

// ----------------------------------------------------------------------------------------
// Endpoints de Actividades
// ----------------------------------------------------------------------------------------

// Crear una actividad
router.post("/activity/create", async (req, res) => {
  try {
    const { currentUsername, currentUserPassword, name, duration } = req.body;

    const result = await createActivity(
      currentUsername,
      currentUserPassword,
      name,
      duration
    );

    if (result.status)
      res.status(200).json(result);
    else
      res.status(401).json(result);

  } catch (error) {
    console.error("Error en /activity/create: ", error);
    res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
  }
});

// Eliminar una actividad por ID
router.delete("/activity/delete", async (req, res) => {
  try {
    const { currentUsername, currentUserPassword, id } = req.body;

    const result = await deleteActivity(currentUsername, currentUserPassword, id);

    if (result.status)
      res.status(200).json(result);
    else
      res.status(401).json(result);

  } catch (error) {
    console.error("Error en /activity/delete: ", error);
    res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
  }
});

// Modificar una actividad por ID
router.patch("/activity/modify", async (req, res) => {
  try {
    const { currentUsername, currentUserPassword, id, newName, newDuration } = req.body;

    const result = await modifyActivity(
      currentUsername,
      currentUserPassword,
      id,
      newName,
      newDuration
    );

    if (result.status)
      res.status(200).json(result);
    else
      res.status(401).json(result);

  } catch (error) {
    console.error("Error en /activity/modify: ", error);
    res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
  }
});

// Buscar una actividad por ID
router.get("/activity/search", async (req, res) => {
  try {
    const currentUsername = req.headers["x-username"];
    const currentUserPassword = req.headers["x-password"];
    const { id } = req.query;

    const result = await searchActivity(currentUsername, currentUserPassword, id);

    if (result.status)
      res.status(200).json(result);
    else
      res.status(401).json(result);

  } catch (error) {
    console.error("Error en /activity/search: ", error);
    res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
  }
});

// Listar todas las actividades
router.get("/activity/list", async (req, res) => {
  try {
    const currentUsername = req.headers["x-username"];
    const currentUserPassword = req.headers["x-password"];

    const result = await listActivity(currentUsername, currentUserPassword);

    if (result.status)
      res.status(200).json(result);
    else
      res.status(401).json(result);

  } catch (error) {
    console.error("Error en /activity/list: ", error);
    res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
  }
});

// ----------------------------------------------------------------------------------------
// Endpoints de dias laborables 
// ----------------------------------------------------------------------------------------

router.post("/workingday/create", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, day, start_hour, end_hour, id_activity } = req.body;

        const result = await createWorkingDay(currentUsername, currentUserPassword, day, start_hour, end_hour, id_activity);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);
            
    } catch (error) {
        console.error("Error en /workingday/create:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.get("/workingday/search", async (req, res) => {
    try {
        const currentUsername = req.headers["x-username"];
        const currentUserPassword = req.headers["x-password"];
        const { day } = req.query;

        const result = await searchWorkingDay(currentUsername, currentUserPassword, day);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /workingday/search:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.patch("/workingday/modify", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, day, new_start_hour, new_end_hour, new_id_activity } = req.body;

        const result = await modifyWorkingDay(currentUsername, currentUserPassword, day, new_start_hour, new_end_hour, new_id_activity);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /workingday/modify:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.delete("/workingday/delete", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, day } = req.body;

        const result = await deleteWorkingDay(currentUsername, currentUserPassword, day);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /workingday/delete:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.get("/workingday/list", async (req, res) => {
    try {
        const currentUsername = req.headers["x-username"];
        const currentUserPassword = req.headers["x-password"];

        const result = await listWorkingDay(currentUsername, currentUserPassword);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /workingday/list:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

// ----------------------------------------------------------------------------------------
// Endpoints de Turnos
// ----------------------------------------------------------------------------------------


// -----------------------------------------------------------
//  DISPONIBILIDAD
// -----------------------------------------------------------

// Disponibilidad por Actividad (próximos 30 días)
router.post("/appointment/availability/activity", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, idActivity } = req.body;

        const result = await availabilityByActivity(currentUsername, currentUserPassword, idActivity);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(400).json(result);

    } catch (error) {
        console.error("Error en /appointment/availability/activity:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// Disponibilidad por Día específico
router.post("/appointment/availability/day", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, idActivity, date } = req.body;

        const result = await availabilityByDay(currentUsername, currentUserPassword, idActivity, date);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(400).json(result);

    } catch (error) {
        console.error("Error en /appointment/availability/day:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// -----------------------------------------------------------
//  BÚSQUEDA DE TURNOS
// -----------------------------------------------------------

// Buscar turno por Fecha y Hora
router.post("/appointment/search/datetime", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, date, time } = req.body;

        const result = await serachAppointmentByDateTime(currentUsername, currentUserPassword, date, time);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(404).json(result);

    } catch (error) {
        console.error("Error en /appointment/search/datetime:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// Buscar todos los turnos de una fecha
router.post("/appointment/search/date", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, date } = req.body;

        const result = await serachAppointmentByDate(currentUsername, currentUserPassword, date);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(404).json(result);

    } catch (error) {
        console.error("Error en /appointment/search/date:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// -----------------------------------------------------------
//  MODIFICACIONES DE TURNOS
// -----------------------------------------------------------

// Modificar datos del cliente
router.patch("/appointment/modify/client", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, oldDate, oldTime, newNameClient, newSurnameClient, newDniClient } = req.body;

        const result = await modifyDataClient(currentUsername, currentUserPassword, oldDate, oldTime, newNameClient, newSurnameClient, newDniClient);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(400).json(result);

    } catch (error) {
        console.error("Error en /appointment/modify/client:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// Reagendar turno
router.patch("/appointment/modify/reschedule", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, oldDate, oldTime, newDate, newTime } = req.body;

        const result = await rescheduleAppointment(currentUsername, currentUserPassword, oldDate, oldTime, newDate, newTime);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(400).json(result);

    } catch (error) {
        console.error("Error en /appointment/modify/reschedule:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// -----------------------------------------------------------
//  CREAR Y CANCELAR TURNOS
// -----------------------------------------------------------

// Crear turno
router.post("/appointment/create", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, nameClient, surnameClient, dni, data, hour, idActivity } = req.body;

        const result = await createAppointment(currentUsername, currentUserPassword, nameClient, surnameClient, dni, data, hour, idActivity);

        if (result.status)
            res.status(201).json(result);
        else
            res.status(400).json(result);

    } catch (error) {
        console.error("Error en /appointment/create:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// Cancelar turno
router.patch("/appointment/cancel", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, date, time, idActivity } = req.body;

        const result = await CanceledAppointment(currentUsername, currentUserPassword, date, time, idActivity);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(400).json(result);

    } catch (error) {
        console.error("Error en /appointment/cancel:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// -----------------------------------------------------------
//  LISTADOS
// -----------------------------------------------------------

// Listar turnos futuros
router.get("/appointment/list/future", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword } = req.body;

        const result = await listFutureAppointments(currentUsername, currentUserPassword);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(404).json(result);

    } catch (error) {
        console.error("Error en /appointment/list/future:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});


// Listar todos los turnos (histórico)
router.get("/appointment/list/all", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword } = req.body;

        const result = await listAllAppointments(currentUsername, currentUserPassword);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(404).json(result);

    } catch (error) {
        console.error("Error en /appointment/list/all:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

export default router;