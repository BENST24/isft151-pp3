import express from "express";
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

// Ruta de login
router.post("/auth/login", loginLimiter, async (req, res) => {
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

router.post("/user/create", userModificationLimiter, async (req, res) => {
    try {
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

router.delete("/user/delete", userModificationLimiter, async (req, res) => {
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

router.patch("/user/modify/enable", userModificationLimiter, async (req, res) => {
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

router.patch("/user/modify/password", userModificationLimiter, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, newPassword } = req.body;

        const { username } = req.params;

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

router.patch("/user/modify/type ", userModificationLimiter, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, newType } = req.body;

        const { username } = req.params;

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

router.patch("/user/modify", userModificationLimiter, async (req, res) => {
    try {
        const { currentUsername, currentUserPassword, newPassword, newType } = req.body;

        const { username } = req.params;

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

router.get("/user/search", async (req, res) => {
    try {
        const currentUsername = req.headers["x-username"];
        const currentUserPassword = req.headers["x-password"];
        const { username } = req.params;

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


router.get("/user/list", async (req, res) => {
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

export default router;