import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

interface User {
    nome: string,
    email: string,
    senha: string
}

const user: User[] = []

app.get("/", (req: Request, res: Response) => {
    res.send("Servidor ligado");
});

app.post("/register", (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    user.push({nome, email, senha});
    console.log(nome, email, senha);
    if (user.find((u) => u.email === email)) {
        console.log("Eu odeio minha vida");
        return;
    }

    res.json({nome: nome, email: email, senha: senha});
});

app.post("/login", (req: Request, res: Response) => {
    const { email, senha } = req.body;
    if (!user.find((u) => u.email === email)) {
        console.log("Usuário não existe");
        return;
    }
    console.log(email, senha);

    res.json({email: email, senha: senha});
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});