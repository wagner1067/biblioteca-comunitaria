import express from "express";
const app = express();

const PORT = 3000;
app.use(express.json());

const users = [];

app.post("/users", createUserController(req, res));

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Esse são os usuários:", users });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
