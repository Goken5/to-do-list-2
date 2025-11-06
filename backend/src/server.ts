import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import listRoutes from "./routes/ListRoutes";
import connectDB from "./config/database";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/lists", listRoutes);

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000");
});