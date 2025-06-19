import { userIdSchema } from "../schema/user.schema.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: "Erro de validação", error: error.error });
  }
};

const validateUserId = (req, res, next) => {
  try {
    const userId = +req.params.id;
    userIdSchema.parse({ userId: userId });
    next();
  } catch (error) {
    res.status(400).json({ message: "Erro de validação", error: error.error });
  }
};

export { validate, validateUserId };
