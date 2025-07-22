import db from "../config/database.js";

db.run(
  `
    CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        bookId INTEGER,
        dueDate DATE,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (bookId) REFERENCES books(id)
    )
`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela loans:", err.message);
    } else {
      console.log("Tabela loans criada/verificada com sucesso.");
    }
  }
);

function createLoanRepository(userId, bookId, dueDate) {
  return new Promise((resolve, reject) => {
    db.run(
      `
            INSERT INTO loans (userId, bookId, dueDate)
            VALUES (?, ?, ?)
            `,
      [userId, bookId, dueDate],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, userId, bookId, dueDate });
        }
      }
    );
  });
}

function findAllLoansRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT * FROM loans;`,
      [],
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

function findLoanByIdRepository(loanId) {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT * FROM loans WHERE id = ?;`,
      [loanId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function deleteLoanRepository(loanId) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        DELETE FROM loans WHERE id = ?;`,
      [loanId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Empréstimo deletado com sucesso." });
        }
      }
    );
  });
}

export default {
  createLoanRepository,
  findAllLoansRepository,
  findLoanByIdRepository,
  deleteLoanRepository,
};
