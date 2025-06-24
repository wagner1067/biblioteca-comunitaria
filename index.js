import express from "express";
import userRouters from "./src/routes/user.routes.js";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouters);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
