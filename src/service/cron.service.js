import cron from "node-cron";
import moment from "moment";
import sendEmail from "./email.service.js";
import loanRepositories from "../repositories/loan.repositories.js";

cron.schedule("0 9 * * *", async () => {
  console.log("Executando tarefa agendada...");
  const loans = await loanRepositories.findAllLoansRepository();
  const today = moment().startOf("day");

  for (const loan of loans) {
    const dueDate = moment(loan.dueDate).startOf("day");
    const reminderDueDate = moment(dueDate).subtract(1, "days");

    if (today.isSame(reminderDueDate)) {
      if (loan.email && loan.title) {
        console.log("Enviando e-mail para:", loan.email, "Livro:", loan.title);
        sendEmail(loan.email, loan.title, loan.dueDate);
      } else {
        console.warn(
          `Usuário sem e-mail definido para empréstimo ID: ${loan.id}`
        );
      }
    }
  }
});
