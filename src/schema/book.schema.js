import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Titulo é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
});

export { bookSchema };
