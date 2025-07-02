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

async function findBookByIdService(bookId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Livro nao encontrado!");
  return book;
}

async function updateBookService(bookId, updatedBook, userId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Livro nao encontrado!");
  if (book.userId !== userId) {
    throw new Error("Acesso negado! Voce nao pode editar este livro.");
  }
  const response = await bookRepository.updateBookRepository(
    updatedBook,
    bookId
  );
  if (!response) throw new Error("Erro ao atualizar livro");
  return response;
}

async function deleteBookService(bookId, userId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Livro nao encontrado!");
  if (book.userId !== userId) {
    throw new Error("Acesso negado! Voce nao pode deletar este livro.");
  }
  const response = await bookRepository.deleteBookRepository(bookId);
  if (!response) throw new Error("Erro ao deletar livro");
  return response;
}
async function searchBooksService(search) {
  if (!search) return await bookRepository.findAllBooksRepository();
  const books = bookRepository.searchBooksRepository(search);
  return books;
}

export default {
  createBookService,
  findAllBooksService,
  findBookByIdService,
  updateBookService,
  deleteBookService,
  searchBooksService,
};
