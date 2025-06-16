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

export default { createUserService };
