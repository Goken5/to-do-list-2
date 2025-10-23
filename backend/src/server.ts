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
    if (user.find((u) => u.email === email)) {
        return res.status(400).json({ message: "Usuário já cadastrado!" });
    }
    user.push({nome, email, senha});
    console.log(nome, email, senha);
    return res.json({nome: nome, email: email, senha: senha});
});

app.post("/login", (req: Request, res: Response) => {
    const { email, senha } = req.body;
    if (!user.find((u) => u.email === email)) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    console.log(email, senha);

    return res.json({email: email, senha: senha});
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});