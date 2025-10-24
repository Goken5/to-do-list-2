import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000");
});