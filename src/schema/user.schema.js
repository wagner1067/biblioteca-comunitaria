import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(20, "O nome de usuário deve ter no máximo 20 caracteres"),
  email: z.string().email("O email deve ser válido"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
      "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    ),
  avatar: z.string().url("URL do avatar deve ser válida").optional(),
});

export { userSchema };
