import express from "express";
import { AuthModel } from "../Models/AuthModel.js";

const router = express.Router();
const authModel = new AuthModel();

// Ruta de login
router.post("/login", async (req, res) => {
    try
    {
        const { username, password } = req.body;

        const result = await authModel.authenticateUser(username, password);

        if (result.status) 
        {
          res.status(200).json(result);
        } else 
        {
          res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error en /login:", error);
        res.status(500).json({ status: false, result: "INTERNAL_SERVER_ERROR" });
    }
});

export default router;