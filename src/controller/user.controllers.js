import userServices from "../service/user.services.js";

async function createUserController(req, res) {
  const newUser = req.body;

  try {
    const token = await userServices.createUserService(newUser);
    res.status(201).send({ message: "Usuário criado com sucesso", token });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Erro ao criar usuário", error: error.message });
  }
}

async function findAllUserController(req, res) {
  try {
    const users = await userServices.findAllUserService();
    res.status(200).send(users);
  } catch (error) {
    res
      .status(404)
      .send({ message: "Erro ao buscar usuários", error: error.message });
  }
}

async function findUserByIdController(req, res) {
  const { id } = req.params;

  try {
    const user = await userServices.findUserByIdService(id);

    res.status(200).send(user);
  } catch (error) {
    res
      .status(404)
      .send({ message: "Usuário não encontrado", error: error.message });
  }
}

async function updateUserController(req, res) {
  const { id } = req.params;
  const newUser = req.body;

  try {
    const user = await userServices.updateUserService(newUser, id);
    res.status(200).send({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Erro ao atualizar usuário", error: error.message });
  }
}

async function deleteUserController(req, res) {
  try {
    const userId = req.params.id;
    const response = await userServices.deleteUserService(userId);
    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export default {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
  deleteUserController,
};
