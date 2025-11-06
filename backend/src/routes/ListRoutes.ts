import { Router, Request, Response } from "express";
import List from "../models/Lists.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, descricao, tarefas, userEmail } = req.body;

        const lista = await List.create({ 
            nome, 
            descricao, 
            tarefas, 
            userEmail 
        });
        return res.status(201).json({
            message: "Lista criada com sucesso",
            lista
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar lista" });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const userEmail = req.query.userEmail as string;
        
        if (!userEmail) {
            return res.status(400).json({ message: "Email é obrigatório" });
        }
        const listasUser = await List.find({ userEmail });
        return res.json(listasUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar listas" });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const lista = await List.findByIdAndDelete(id);
        if (!lista) {
            return res.status(404).json({ message: "Lista não encontrada" });
        }
        return res.json({ message: "Lista deletada com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao deletar lista" });
    }
});

export default router;