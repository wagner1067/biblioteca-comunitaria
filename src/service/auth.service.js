import jwt from "jsonwebtoken";
import "dotenv/config";
import userRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

export function generateJWT(id) {
  return jwt.sign(
    { id },
    process.env.SECRET_JWT,
    { expiresIn: 86400 } // 1 dia em segundos
  );
}

async function loginService(email, password) {
  const user = await userRepositories.findUserByEmail(email);
  if (!user) throw new Error("Usuário invalido");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Usuário invalido");

  return generateJWT(user.id);
}

export default { generateJWT, loginService };
