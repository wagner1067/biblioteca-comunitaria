import userRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

async function createUserService(newUser) {
  const foundUser = await userRepositories.findUserByEmail(newUser.email);
  if (foundUser) throw new Error("Usuário já existe com este email");
  const passHash = await bcrypt.hash(newUser.password, 10);
  const user = await userRepositories.createUserRepository({
    ...newUser,
    password: passHash,
  });
  if (!user) throw new Error("Erro ao criar usuário");
  return user;
}

async function findAllUsersService() {
  const users = await userRepositories.findAllUsers();
  if (!users) throw new Error("Nenhum usuário encontrado");
  return users;
}

async function findUserByIdService(id) {
  const user = await userRepositories.findUserById(id);
  if (!user) throw new Error("Usuário nao encontrado");
  return user;
}

async function updateUserService(newUser, userID) {
  const user = await userRepositories.findUserById(userID);
  if (!user) throw new Error("Usuário não existe!");
  if (newUser.password) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }
  const userUpdated = await userRepositories.updateUser(userID, newUser);
  if (!userUpdated) throw new Error("Erro ao atualizar usuário");
  return userUpdated;
}

export default {
  createUserService,
  findAllUsersService,
  findUserByIdService,
  updateUserService,
};
