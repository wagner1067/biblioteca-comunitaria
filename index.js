import express from "express";
const app = express();

const PORT = 3000;
app.use(express.json());

const users = [];

app.post("/users", (req, res) => {
  const body = req.body;
  users.push(body);
  res.status(201).send("Usuário criado com sucesso");
});

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Esse são os usuários:", users });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
