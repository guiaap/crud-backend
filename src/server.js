import express from "express";
import "dotenv/config";
import usersRouter from "./routes/user.js";
import dbtestRouter from "./routes/dbtest.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/usuarios", usersRouter);
app.use("/dbtest", dbtestRouter);

app.listen(PORT, () => {
    console.log(`Servidor inicializado em http://localhost:${PORT}`);
});