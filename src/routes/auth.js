import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { email, senha } = req.body;

        if(
            typeof email !== "string" ||
            typeof senha !== "string" ||
            !email ||
            !senha
        ) {
            
            return res.status(400).json({
                message: "Usuário ou senha inválidos."
            });
        }

        const IsEmailValid = email === process.env.ADMIN_EMAIL;

        const isPasswordValid = await bcrypt.compare(
            senha, process.env.ADMIN_PASSWORD_HASH
        );

        if(!IsEmailValid || !isPasswordValid) {

            return res.status(401).json({
                message: "Usuário ou senha incorretos."
            });
        }

        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
                issuer: "crud-backend",
                audience: "crud-backend-api"
            }
        );

        return res.status(200).json({
            message: "Autenticação realizada com sucesso.",
            token,
            tokenType: "Bearer",
            expiresIn: 900
        });

    } catch(error) {

        console.error("Erro no processo de autenticação", error);

        return res.status(500).json({
            message: "Não foi possível realizar a autenticação."
        });
    }
});

export default router;