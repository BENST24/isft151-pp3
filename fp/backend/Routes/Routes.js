import express, { response } from "express";
import rateLimit from "express-rate-limit";
import { authenticateUser } from "../Models/AuthModel.js";
import { createUser } from "../Models/UserManager.js";
import { deleteUser } from "../Models/UserManager.js";
import { enableBlockedUser } from "../Models/UserManager.js";
import { modifyUserPassword } from "../Models/UserManager.js";
import { modifyUserType } from "../Models/UserManager.js";
import { modifyUser } from "../Models/UserManager.js";
import { searchUser } from "../Models/UserManager.js";
import { listUser } from "../Models/UserManager.js";

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


// Ruta de login
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

router.post("/activity/create", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, name, duration } = req.body;

        const result = await createActivity(currentUsername, currentUserPassword, name, duration);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /activity/create: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.delete("/activity/delete", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, name } = req.body;

        const result = await deleteActivity(currentUsername, currentUserPassword, name);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /activity/delete: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.patch("/activity/modify", async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, name, newName, newDuration } = req.body;

        const result = await modifyActivity(currentUsername, currentUserPassword, name, newName, newDuration);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /activity/modify: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

router.get("/activity/search", async (req, res) => {
    try {
        const currentUsername = req.headers["x-username"];
        const currentUserPassword = req.headers["x-password"];
        const { name } = req.query;

        const result = await searchActivity(currentUsername, currentUserPassword, name);

        if (result.status)
            res.status(200).json(result);
        else
            res.status(401).json(result);

    } catch (error) {
        console.error("Error en /activity/search: ", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

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


export default router;