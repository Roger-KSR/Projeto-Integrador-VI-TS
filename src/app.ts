import express from "express";
import produtoRoutes from "./routes/produto.routes";
import funcionarioRoutes from "./routes/funcionario.routes";

export const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/funcionarios", funcionarioRoutes);

app.get("/", (req, res) => {
  res.send("API está rodando perfeitamente! Acesse /produtos ou /funcionarios");
});
