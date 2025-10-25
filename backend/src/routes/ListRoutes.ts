import { Router, Request, Response } from "express";
import { Lista, listas } from "../database/data";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    const { id, nome, descricao, tarefas, userEmail } = req.body;

    listas.push({ id, nome, descricao, tarefas, userEmail })
    return res.status(201).json({
        message: "Lista criada com sucesso",
    })
})

router.get("/", (req: Request, res: Response) => {
    const userEmail = req.query.userEmail as string;
    if(!userEmail) return res.status(400).json({ message: "cade o email"});

    const listasUser = listas.filter(l => l.userEmail === userEmail);
    return res.json(listasUser);
})

router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const index = listas.findIndex(l => l.id === id);

    if(index === -1) return res.status(404).json({ message: "essa lista nem existe"});
    listas.splice(index, 1);
    return res.json({ message: "ja foi essa merda"});
})


export default router