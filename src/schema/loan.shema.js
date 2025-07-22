import { z } from "zod";

const loanSchema = z.object({
  bookId: z
    .number()
    .int()
    .positive("O ID do livro deve ser um número positivo inteiro."),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .min(10, "A data de vencimento deve estar no formato YYYY-MM-DD."),
});

const loanIdSchema = z.object({
  loanId: z
    .number()
    .int()
    .positive("O ID do empréstimo deve ser um número positivo inteiro."),
});

export { loanSchema, loanIdSchema };
