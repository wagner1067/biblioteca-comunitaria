# Biblioteca Comunitária

Este projeto consiste em uma API RESTful para gerenciamento de uma biblioteca comunitária, permitindo o controle de usuários, livros, empréstimos e envio automatizado de lembretes por e-mail.

## Funcionalidades

- Cadastro, autenticação e listagem de usuários
- Registro, consulta e atualização de livros
- Empréstimos de livros vinculados a usuários
- Lembretes automáticos por e-mail para devolução de livros (via agendamento com `node-cron`)
- Validação de dados com a biblioteca `zod`
- Envio de e-mails com `nodemailer`
- Autenticação baseada em tokens JWT

---

## Tecnologias Utilizadas

- **Node.js** — Runtime JavaScript
- **Express.js** — Framework web
- **SQLite3** — Banco de dados relacional leve
- **JWT (jsonwebtoken)** — Autenticação por token
- **Nodemailer** — Envio de e-mails
- **Node-cron** — Agendador de tarefas
- **Moment.js** — Manipulação de datas
- **Zod** — Validação de esquemas
- **Bcrypt** — Criptografia de senhas
- **Dotenv** — Variáveis de ambiente

---

## Instalação

### 1. Clonagem do repositório

```bash
git clone https://github.com/wagner1067/biblioteca-comunitaria.git
cd biblioteca-comunitaria
```

### 2. Instalação das dependências

```bash
npm install
```

### 3. Configuração de variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
SECRET_JWT=sua_chave_jwt
EMAIL=seu_email@gmail.com
PASS=sua_senha_app
```

> ⚠️ A senha do e-mail deve ser uma [senha de aplicativo](https://support.google.com/accounts/answer/185833) se você estiver usando Gmail com 2FA ativado.

### 4. Execução do servidor

```bash
npm run dev
```

### 5. Testes

```bash
npm run test
```

---

## Rotas Principais

| Método | Rota           | Descrição                                   |
|--------|----------------|---------------------------------------------|
| POST   | `/users`       | Criação de usuário                          |
| POST   | `/login`       | Autenticação de usuário                     |
| GET    | `/books`       | Listagem de todos os livros                 |
| GET    | `/books/search`| Busca por título via query params           |
| POST   | `/books`       | Cadastro de novo livro (autenticado)        |
| POST   | `/loans`       | Registro de empréstimo (autenticado)        |
| GET    | `/loans`       | Listagem de empréstimos                     |
| GET    | `/loans/:id`   | Consulta de empréstimo por ID               |
| DELETE | `/loans/:id`   | Exclusão de empréstimo (autenticado)        |

---

## Agendamento de Tarefas (node-cron)

A aplicação possui um agendador que verifica diariamente os empréstimos com devolução marcada para o dia seguinte. Se houver algum empréstimo com vencimento próximo, o sistema envia automaticamente um e-mail de lembrete ao usuário responsável.

Este processo é executado em segundo plano e não requer ação manual após o servidor estar em execução.

---

## Autor

**Wagner Oliveira**  
GitHub: [https://github.com/wagner1067](https://github.com/wagner1067)

---

## Licença

Este projeto está licenciado sob a Licença MIT.
