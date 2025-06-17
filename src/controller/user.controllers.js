import userServices from "../service/user.services.js";

async function createUserController(req, res) {
  const newUser = req.body;

  try {
    const user = await userServices.createUserService(newUser);
    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
}

async function findAllUsersController(req, res) {
  try {
    const users = await userServices.findAllUsersService();
    res.status(200).json({ message: "Usuários encontrados", users });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao buscar usuários", error: error.message });
  }
}

async function findUserByIdController(req, res) {
  const { id } = req.params;

  try {
    const user = await userServices.findUserByIdService(id);
    res.status(200).json({ message: "Usuário encontrado", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao buscar usuário", error: error.message });
  }
}

async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const user = await userServices.updateUserService(newUser, id);
    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar usuário", error: error.message });
  }
}

export default {
  createUserController,
  findAllUsersController,
  findUserByIdController,
  updateUserController,
};
