import userRepositories from "../repositories/user.repositories.js";

async function createUserService(newUser) {
  const foundUser = await userRepositories.findUserByEmail(newUser.email);
  if (foundUser) {
    throw new Error("Usuário já existe com este email");
  }
  const user = await userRepositories.createUserRepository(newUser);
  return user;
}

export default { createUserService };
