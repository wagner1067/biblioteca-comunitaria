import bookController from "../controller/book.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  validate,
  validateBookId,
} from "../middlewares/validation.middlewares.js";
import { bookSchema, bookSearchSchema } from "../schema/book.schema.js";

const router = Router();

router.get("/", bookController.findAllBooksController);

router.use(authMiddleware);
router.post("/", validate(bookSchema), bookController.createBookController);
router.get(
  "/books/search",
  validate(bookSearchSchema, "query"),
  bookController.searchBooksController
);
router.get("/:id", validateBookId, bookController.findBookByIdController);
router.patch("/:id", validateBookId, bookController.updateBookController);
router.delete("/:id", validateBookId, bookController.deleteBookController);

export default router;
