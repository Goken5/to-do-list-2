import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Servidor ligado");
})

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});