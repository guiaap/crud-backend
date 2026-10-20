import express from "express";
import "dotenv/config";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/login", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor inicializado em http://localhost:${PORT}`);
});