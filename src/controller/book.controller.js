import bookService from "../service/book.service.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.user.id;

  try {
    const createdBook = await bookService.createBookService(newBook, userId);
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookService.findAllBooksService();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default {
  createBookController,
  findAllBooksController,
};
