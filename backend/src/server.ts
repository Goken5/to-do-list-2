import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Servidor ligado");
})
app.post("/register", (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;

    res.json({message: "Usuário Registrado"});
} )
app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});