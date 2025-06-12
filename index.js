import express from "express";
import userRouters from "./src/routes/user.routes.js";
const app = express();

const PORT = 3000;
app.use(express.json());
app.use(userRouters);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
