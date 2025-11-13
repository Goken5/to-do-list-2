import { Router, Request, Response } from "express";
import User from '../models/User';

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const user = await User.create({ nome, email, senha });

    res.status(201).json({ 
      message: "Usuário criado com sucesso",
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email
      },
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isSenhaCorreta = await user.compareSenha(senha);
    if (!isSenhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.json({ 
      message: "Login realizado com sucesso",
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email
      },
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
export default userRouter;