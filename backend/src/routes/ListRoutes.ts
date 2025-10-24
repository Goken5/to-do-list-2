import { Router, Request, Response } from "express";
import { Lista, listas } from "../database/data";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    const { nome, descricao } = req.body;

    listas.push({ nome, descricao})
})

export default router