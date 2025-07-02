import db from "../config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela books:", err.message);
    } else {
      console.log("Tabela books criada/verificada com sucesso.");
    }
  }
);

function createBookRepository(newBook, userId) {
  return new Promise((resolve, reject) => {
    const { title, author } = newBook;
    db.run(
      `INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`,
      [title, author, userId],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve({ id: this.lastID, ...newBook });
      }
    );
  });
}

function findAllBooksRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findBookByIdRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function updateBookRepository(updatedBook, bookId) {
  return new Promise((resolve, reject) => {
    const fields = ["title", "author", "userId"];
    let query = "UPDATE books SET ";
    const values = [];

    fields.forEach((field) => {
      if (updatedBook[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(updatedBook[field]);
      }
    });

    query = query.slice(0, -1);
    query += " WHERE id = ?";
    values.push(bookId);
    db.run(query, values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "Livro atualizado com sucesso",
          id: bookId,
          ...updatedBook,
        });
      }
    });
  });
}

function deleteBookRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id = ?`, [bookId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Livro deletado com sucesso", id: bookId });
      }
    });
  });
}

function searchBooksRepository(search) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      [`%${search}%`, `%${search}%`],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export default {
  createBookRepository,
  findAllBooksRepository,
  findBookByIdRepository,
  updateBookRepository,
  deleteBookRepository,
  searchBooksRepository,
};
