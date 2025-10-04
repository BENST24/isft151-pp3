import express from "express";
import { AuthModel } from "../Models/AuthModel.js";

const router = express.Router();
const authModel = new AuthModel();

// Ruta de login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const result = authModel.authenticateUser(username, password);

  if (result.status) 
  {
    res.status(200).json(result);
  } else 
  {
    res.status(401).json(result);
  }
});

export default router;