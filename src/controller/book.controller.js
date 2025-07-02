import bookService from "../service/book.service.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.user.id;

  try {
    const createdBook = await bookService.createBookService(newBook, userId);
    res.status(201).send(createdBook);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookService.findAllBooksService();
    res.status(200).send(books);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function findBookByIdController(req, res) {
  const bookId = req.params.id;

  try {
    const book = await bookService.findBookByIdService(bookId);
    res.status(200).send(book);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function updateBookController(req, res) {
  const updatedBook = req.body;
  const bookId = req.params.id;
  const userId = req.user.id;

  try {
    const response = await bookService.updateBookService(
      bookId,
      updatedBook,
      userId
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function deleteBookController(req, res) {
  const bookId = req.params.id;
  const userId = req.user.id;

  try {
    const response = await bookService.deleteBookService(bookId, userId);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function searchBooksController(req, res) {
  const search = req.query.search;

  try {
    const books = await bookService.searchBooksService(search);
    res.status(200).send(books);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

export default {
  createBookController,
  findAllBooksController,
  findBookByIdController,
  updateBookController,
  deleteBookController,
  searchBooksController,
};
