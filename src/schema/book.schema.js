import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Titulo é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
});

const bookIdSchema = z.object({
  bookId: z.number().int().positive("ID do livro deve ser um número positivo"),
});

const bookSearchSchema = z.object({
  search: z.string().min(3, "Termo de busca é obrigatório"),
});
export { bookSchema, bookIdSchema, bookSearchSchema };
