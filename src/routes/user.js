import { Router } from "express";
import { pool } from "../config/database.js";
import { validateEmail } from "../utils/validateEmail.js";
import { validateName } from "../utils/validateName.js";

const router = Router();

router.get("/", async (req, res) => {

    try {

        const result = await pool.query("SELECT id, nome, email FROM usuarios ORDER BY id");

        res.status(200).json({
            usuarios: result.rows,
        });
    
    } catch(error) {
    
        console.error("Erro ao consultar o banco de dados:", error);

        res.status(500).json({
            error: "Não foi possível buscar os usuários",
        });
    }
});

router.get("/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await pool.query(`
            SELECT id, nome, email FROM usuarios WHERE id = $1
        `, [id]);

        res.status(200).json({
            usuario: result.rows[0]
        });

    } catch(error) {

        console.error("Erro ao consultar o banco de dados:", error);

        res.status(500).json({
            error: "Não foi possível busca o usuário",
        });
    }

});

router.post("/", async (req, res) => {

    const { nome, email } = req.body ?? {};

    if(!validateName(nome)) {
        return res.status(400).json({ error: "Nome inválido" });
    }

    if(!validateEmail(email)) {
        return res.status(400).json({ error: "E-mail inválido." });
    }

    try {

        const result = await pool.query(`
         INSERT INTO usuarios(nome, email) VALUES($1, $2)
         RETURNING id, nome, email
         `, [nome, email]);

        res.status(200).json({
            message: "Usuário criado com sucesso.",
            user: result.rows[0]
        });

    } catch(error) {

        console.error("Erro ao criar usuário no DB:", error);

        res.status(500).json({
            error: "Erro ao cadastrar usuário."
        });
    }
});

router.put("/:id", async (req, res) => {

    const { id } = req.params;
    const { nome, email } = req.body ?? {};

    if(!validateName(nome)) {
        return res.status(400).json({ error: "Nome inválido" });
    }

    if(!validateEmail(email)) {
        return res.status(400).json({ error: "E-mail inválido." });
    }

    try {

        const result = await pool.query(`
            UPDATE usuarios SET nome = $1, email = $2
            WHERE id = $3 RETURNING *
        `, [nome, email, id]);

        res.status(200).json({
            message: "Usuário atualizado com sucesso.",
            user: result.rows[0]
        });

    } catch(error) {

        console.error("Erro ao atualizar usuário no DB:", error);

        res.status(500).json({
            error: "Não foi possível atualizar o usuário"
        });
    }
});

router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await pool.query(`
            DELETE FROM usuarios WHERE id = $1 RETURNING *
        `, [id]);

        res.status(200).json({
            message: "Usuário removido com sucesso.",
            user: result.rows[0]
        });

    } catch(error) {

        console.error("Erro ao remover usuário no DB:", error);

        res.status(500).json({
            error: "Não foi possível remover o usuário"
        });
    }
});

export default router;