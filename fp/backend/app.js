import express from "express";
import cors from "cors";
import authRoutes from "./Routes/AuthRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // Para leer JSON del body


app.use(cors());

// Montar las rutas
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});