import express from "express";
import userRouters from "./src/routes/user.routes.js";
import bookRouters from "./src/routes/book.routes.js";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouters);
app.use(bookRouters);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
