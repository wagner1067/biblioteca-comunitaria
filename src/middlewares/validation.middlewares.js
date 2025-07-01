import { userIdSchema } from "../schema/user.schema.js";
import { bookIdSchema } from "../schema/book.schema.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(404).json({ message: "Erro de validação", error: error.error });
  }
};

const validateUserId = (req, res, next) => {
  try {
    const userId = +req.params.id;
    userIdSchema.parse({ userId: userId });
    next();
  } catch (error) {
    res.status(404).json({ message: "Erro de validação", error: error.error });
  }
};

const validateBookId = (req, res, next) => {
  try {
    bookIdSchema.parse({ bookId: +req.params.id });
    if (isNaN(+req.params.id)) {
      throw new Error("Id inválido");
    }
    next();
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro de validação", error: error.message });
  }
};

export { validate, validateUserId, validateBookId };
