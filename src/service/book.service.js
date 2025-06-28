import bookRepository from "../repositories/book.repositories.js";

async function createBookService(newBook, userId) {
  const createdBook = await bookRepository.createBookRepository(
    newBook,
    userId
  );
  if (!createdBook) throw new Error("Erro ao criar livro");
  return createdBook;
}

async function findAllBooksService() {
  const books = await bookRepository.findAllBooksRepository();
  if (!books) throw new Error("Nenhum livro cadastrado!");
  return books;
}

export default {
  createBookService,
  findAllBooksService,
};
