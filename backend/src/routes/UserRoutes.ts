import { Router, Request, Response } from "express";
import { users, User } from "../database/data";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "usuario ja existe" });
  }

  users.push({ nome, email, senha });
  return res.status(201).json({ message: "usuario cadastrado" });
});

router.post("/login", (req: Request, res: Response) => {
  const { email, senha } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "usuario nao existe" });

  if (user.senha !== senha)
    return res.status(401).json({ message: "senha incorreta" });

  return res.json({ 
    message: "sucesso no login",
    user: { nome: user.nome, email: user.email } 
  });
  
});

export default router;