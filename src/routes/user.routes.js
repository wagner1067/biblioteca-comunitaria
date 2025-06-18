import { Router } from "express";
import userController from "../controller/user.controllers.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";

const router = Router();

router.post(
  "/users",
  validate(userSchema),
  userController.createUserController
);
router.get("/users", userController.findAllUserController);
router.get("/users/:id", userController.findUserByIdController);
router.put(
  "/users/:id",
  validate(userSchema),
  userController.updateUserController
);

export default router;
