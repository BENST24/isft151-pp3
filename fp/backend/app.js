import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// --- Carga de Variables de Entorno ---
// Es CRUCIAL que esto se ejecute ANTES de importar cualquier otro módulo que dependa de las variables de entorno (como db.js).
const __filename_dotenv = fileURLToPath(import.meta.url);
const __dirname_dotenv = path.dirname(__filename_dotenv);
const envPath = path.resolve(__dirname_dotenv, '..', '..', '.env');
dotenv.config({ path: envPath });

import express from "express";
import cors from "cors";
import Routes from "./Routes/Routes.js";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3000;

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos del frontend
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

app.use(express.json()); // Para leer JSON del body


app.use(cors());

const globalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200,
    message: { status: false, result: "TOO_MANY_REQUESTS_GLOBAL" }
});

app.use(globalLimiter);

// Montar las rutas
app.use("/api", Routes);

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});