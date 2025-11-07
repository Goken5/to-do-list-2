import { Router, Request, Response } from "express";
import List from "../models/Lists";
import mongoose from "mongoose"; // Importe o mongoose

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, descricao, tarefas, userEmail } = req.body;

        console.log("Dados recebidos:", { nome, descricao, tarefas, userEmail });

        if (!nome || !userEmail) {
            return res.status(400).json({ 
                message: "Nome e userEmail são obrigatórios" 
            });
        }

        const lista = await List.create({ 
            nome, 
            descricao, 
            tarefas: tarefas || [],
            userEmail 
        });
        
        console.log("Lista criada:", lista);
        return res.status(201).json({
            message: "Lista criada com sucesso",
        });
    } catch (error) {
        console.error("Erro detalhado:", error);
        return res.status(500).json({ 
            message: "Erro ao criar lista",
        });
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

        console.log("Tentando deletar lista com ID:", id);
        console.log("Tipo do ID:", typeof id);

        // Verifica se o ID é válido para MongoDB
        if (!mongoose.Types.ObjectId.isValid(String(id))) {
            console.log("ID inválido:", id);
            return res.status(400).json({ message: "ID inválido" });
        }

        const lista = await List.findByIdAndDelete(id);
        
        if (!lista) {
            console.log("Lista não encontrada para ID:", id);
            return res.status(404).json({ message: "Lista não encontrada" });
        }
        
        console.log("Lista deletada com sucesso:", lista);
        return res.json({ message: "Lista deletada com sucesso" });
    } catch (error) {
        console.error("Erro detalhado ao deletar lista:", error);
        return res.status(500).json({ 
            message: "Erro ao deletar lista",
        });
    }
});

export default router;