# 💍 Controle de Despesas - Casamento

Sistema backend para gerenciamento de convidados e controle financeiro de um casamento, desenvolvido com NestJS, TypeORM e PostgreSQL.

---

## 🚀 Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/) (Documentação de API)
- [JWT](https://jwt.io/) (Autenticação)
- [Class Validator](https://github.com/typestack/class-validator)

---

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3333
JWT_SECRET=secretKey
JWT_EXPIRES_IN=30d

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=suasenha
DB_NAME=wedding

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

> ⚠️ Importante: após subir a aplicação, um usuário admin é criado automaticamente com os dados acima.

## 🛠️ Como rodar o projeto

1. Instale as dependências:

```
npm install
```

2. Suba o banco de dados PostgreSQL (local ou via Docker)

3. Execute o projeto:

```
npm run start:dev
```

## 🔐 Autenticação

O login retorna um token JWT:

> POST /auth/login

Payload:

```
{
  "username": "admin",
  "password": "admin123"
}
```

Resposta:

```
{
  "access_token": "...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

> Use o token no header das requisições protegidas:  `Authorization: Bearer <access_token>`

## 📘 Documentação da API

A documentação Swagger está disponível em:

```
http://localhost:3333/api
```

Inclui todos os endpoints para:

- 👥 Convidados (/guests)

- 🔐 Usuários e login (/auth, /users)

- 💸 Despesas (/expenses)

- 🏷️ Tipos de despesas (/expense-types)

---

## 📦 Estrutura dos Módulos

```
src/
├── auth/               → Módulo de autenticação e JWT
├── users/              → Gestão de usuários do dashboard
├── guest/              → Confirmação de presença dos convidados
├── wedding-expense/    → Cadastro de despesas do casamento
├── expense-type/       → Tipos de despesas (Buffet, DJ, Decoração, etc)
├── common/             → Exceptions e Responses padronizadas

```

## 🧠 Regras de Negócio - Despesas

Cada despesa tem:

- totalValue → valor total

- paidValue → valor já pago

- saldo → calculado automaticamente

## 💰 Pagamento parcial

```
PATCH /expenses/:id/pay

{
  "amount": 500
}
```

> O valor é somado ao paidValue, respeitando o limite de totalValue.

## 🧪 Testando com Insomnia

- Faça login com /auth/login

- Use o token retornado em todas as rotas protegidas

- Exemplos de payloads estão na documentação ou no Swagger

## 📄 Licença

Projeto privado para fins pessoais/evento.