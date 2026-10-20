import { Router } from "express";
import pool from "../config/database.js";

const router = Router();

router.get("/db", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        res.status(200).json({
            message: "Conexão com o PostgreSQL estabelecida.",
            time: result.rows[0].now
        });

    } catch(error) {
        
        console.error("Erro de conexão com o PostgreSQL.", error);

        res.status(500).json({
            error: "Erro ao conectar-se com o banco de dados."
        });
    }
});

export default router;