import userRepositories from "../repositories/user.repositories.js";

async function createUserService(newUser) {
  const user = await userRepositories.createUserRepository(newUser);
  return user;
}

export default { createUserService };
