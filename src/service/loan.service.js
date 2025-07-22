import loanRepositories from "../repositories/loan.repositories.js";

async function createLoanService(userId, bookId, dueDate) {
  const createdLoan = await loanRepositories.createLoanRepository(
    userId,
    bookId,
    dueDate
  );
  if (!createdLoan) {
    throw new Error("Erro ao criar o empréstimo");
  }
  return createdLoan;
}

async function findAllLoansService() {
  const loans = await loanRepositories.findAllLoansRepository();
  return loans;
}

async function findLoanByIdService(loanId) {
  const loan = await loanRepositories.findLoanByIdRepository(loanId);
  if (!loan) {
    throw new Error("Empréstimo não encontrado");
  }
  return loan;
}

async function deleteLoanService(loanId, userId) {
  const loan = await loanRepositories.findLoanByIdRepository(loanId);
  if (!loan) {
    throw new Error("Empréstimo não encontrado!");
  }
  if (loan.userId !== userId) {
    throw new Error("Acesso negado! Vocês nao pode deletar este empréstimo.");
  }
  const response = await loanRepositories.deleteLoanRepository(loanId);
  return response;
}

export default {
  createLoanService,
  findAllLoansService,
  findLoanByIdService,
  deleteLoanService,
};
