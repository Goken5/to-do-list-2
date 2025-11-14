import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import listRoutes from "./routes/ListRoutes";
import connectDB from "./config/database";

//const port = 3000
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://to-do-list-goken.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
}));
app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/lists", listRoutes);

app.get("/", (req, res) => {
  res.json({ 
    message: "Backend tá rodando dboa",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

//app.listen(port, () => {
  //console.log("Servidor rodando na porta " + port);
//});
export default app