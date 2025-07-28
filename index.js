import express from "express";
import { routers } from "./src/routes/index.js"; // Importando as rotas
import "dotenv/config";
import "./src/service/cron.service.js"; // Importando o serviço de cron para iniciar as tarefas agendadas

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routers); // Usando as rotas importadas

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
