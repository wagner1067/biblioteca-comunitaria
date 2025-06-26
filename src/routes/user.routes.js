import { Router } from "express";
import userController from "../controller/user.controllers.js";
import {
  validate,
  validateUserId,
} from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/users",
  validate(userSchema),
  userController.createUserController
);
router.post("/users/login", userController.loginUserController);

router.use(authMiddleware);
router.get("/users", userController.findAllUserController);
router.get("/users/:id", validateUserId, userController.findUserByIdController);
router.patch("/users/:id", validateUserId, userController.updateUserController);
router.delete(
  "/users/:id",
  validateUserId,
  userController.deleteUserController
);

export default router;
