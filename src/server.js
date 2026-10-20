import express from "express";
import "dotenv/config";
import usersRouter from "./routes/user.js";
import dbtestRouter from "./routes/dbtest.js";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/dbtest", dbtestRouter);
app.use("/usuarios", usersRouter);
app.use("/login", authRouter);

app.listen(PORT, () => {
    console.log(`Servidor inicializado em http://localhost:${PORT}`);
});