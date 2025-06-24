import userRepositories from "../repositories/user.repositories.js";
import { generateJWT } from "./auth.service.js";
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
  const token = generateJWT(user.id);
  return token;
}

async function findAllUserService() {
  const users = await userRepositories.findAllUserRepository();
  if (!users) throw new Error("Nenhum usuário cadastrado!");
  return users;
}

async function findUserByIdService(id) {
  const user = await userRepositories.findUserByIdRepository(id);
  if (!user) throw new Error("Usuário não existe!");
  return user;
}

async function updateUserService(newUser, userId) {
  const user = await userRepositories.findUserByIdRepository(userId);
  if (!user) throw new Error("Usuário não encontrado!");
  if (newUser.password) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }
  const userUpdated = await userRepositories.updateUserRepository(
    userId,
    newUser
  );
  return userUpdated;
}

async function deleteUserService(userId) {
  const user = await userRepositories.findUserByIdRepository(userId);
  if (!user) throw new Error("Usuário não encontrado!");
  const { message } = await userRepositories.deleteUserRepository(userId);
  return message;
}

export default {
  createUserService,
  findAllUserService,
  findUserByIdService,
  updateUserService,
  deleteUserService,
};
