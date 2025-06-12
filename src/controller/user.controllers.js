import userServices from "../service/user.services.js";

async function createUserController(req, res) {
  const newUser = req.body;

  try {
    const user = await userServices.createUserService(newUser);
    res.status(201).json({ user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
}

export default { createUserController };
