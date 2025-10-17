import express from "express";
import cors from "cors";
import Routes from "./Routes/Routes.js";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});