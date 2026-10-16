import express from "express";
import { validateEmail } from "./utils/validateEmail.js";
import { validateName } from "./utils/validateName.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const usuarios = [
    { id: 1, nome: "Ana", email: "ana@mail.com" },
    { id: 2, nome: "Marcos", email: "marcos@mail.com" }
];

app.get("/usuarios", (req, res) => {

    res.json(usuarios);
});

app.post("/usuarios", (req, res) => {

    const { nome, email } = req.body ?? {};

    if(!validateName(nome)) {
        return res.status(400).json({ error: "Nome inválido" });
    }

    if(!validateEmail(email)) {
        return res.status(400).json({ error: "E-mail inválido." });
    }

    const usuario = { 
        id: usuarios.length + 1, 
        nome: nome.trim(), 
        email: email
    };

    usuarios.push(usuario);

    res.status(201).json(usuario);
});

app.put("/usuarios/:id", (req, res) => {

    const { id } = req.params;
    const { nome, email } = req.body ?? {};

    const usuario = usuarios.find(u => u.id === Number(id));

    if(!usuario) {
        return res.status(404).json({ error: "Usuário não localizado" });
    }

    if(!validateName(nome)) {
        return res.status(400).json({ error: "Nome inválido" });
    }

    if(!validateEmail(email)) {
        return res.status(400).json({ error: "E-mail inválido." });
    }

    usuario.nome = nome.trim();
    usuario.email = email;

    res.status(204).send();
});

app.delete("/usuarios/:id", (req, res) => {

    const { id } = req.params;

    const index = usuarios.findIndex(u => u.id === Number(id));

    if(index === -1) {
        return res.status(404).json({ error: "Usuário não localizado" });
    }

    usuarios.splice(index, 1);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor inicializado em http://localhost:${PORT}`);
});