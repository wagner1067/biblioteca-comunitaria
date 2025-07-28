import nodemailer from "nodemailer";
import "dotenv/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

function sendEmail(email, bookTitle, dueDate) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Lembrete: Data de entrega do livro se aproximando",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #f60;">Lembrete da Biblioteca Comunitária</h2>
      <p>Caro usuário,</p>
      <p>Este é um lembrete de que o livro <strong>"${bookTitle}"</strong>é devido em<strong>${dueDate}</strong>.</p>
      <p>Por favor, devolva ou renove a tempo.</p>
      <p>Atenciosamente,<br>Sua biblioteca comunitária</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar o e-mail:", error);
    } else {
      console.log("E-mail enviado com sucesso:", info.response);
    }
  });
}

export default sendEmail;
