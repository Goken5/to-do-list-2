import { Router, Request, Response } from "express";
import User from '../models/User';

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const user = await User.create({ nome, email, senha });

    res.status(201).json({ 
      message: "Usuário criado com sucesso",
      user,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (user.senha !== senha) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.json({ 
      message: "Login realizado com sucesso",
      user,
    });
    
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
export default router