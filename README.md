# CRUD de Usuários com Node.js, Express, JWT e PostgreSQL

Mini-projeto desenvolvido com o objetivo de praticar os conceitos básicos de desenvolvimento back-end.

## Funcionalidades

- Autenticar administrador.
- Listar usuários.
- Cadastrar usuários.
- Atualizar usuários.
- Excluir usuários.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- JSON Web Token
- Bcrypt
- Dotenv
- Nodemon

## Como executar

1. Clone este repositório.
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Renomeie o arquivo .env.example para somente .env.
4. Preencha as variáveis de ambiente DB_PASSWORD, JWT_SECRET, ADMIN_EMAIL e ADMIN_PASSWORD_HASH no arquivo .env.
5. Inicie o servidor:

   ```bash
   npm start
   ```
   Ou com o Nodemon:

    ```bash
   npm run dev
   ```
O servidor será inicializado em `http://localhost:3000`.

## Rotas

| Método | Rota | Descrição | Exige Autenticação |
|---|---|---|---|
| POST | `/login` | Autentica o administrador | Não |
| GET | `/health/db` | Verifica conexão com o PostgreSQL | Não |
| GET | `/users` | Lista todos os usuários | Sim |
| GET | `/users/:id` | Lista um usuário | Sim |
| POST | `/users` | Cadastra um usuário | Sim |
| PUT | `/users/:id` | Atualiza um usuário | Sim |
| DELETE | `/users/:id` | Exclui um usuário | Sim |

## Autenticação

A autenticação utilizando JSON Web Token (JWT) é realizada por meio de credenciais administrativas únicas, configuradas no arquivo .env. A variável ADMIN_PASSWORD_HASH deve conter o hash da senha administrativa, gerado com o algoritmo bcrypt. Durante a autenticação, a senha enviada na requisição é comparada com o hash armazenado para validar as credenciais e permitir a emissão do token JWT.

O comando de terminal abaixo gera o hash a partir da senha ExemploSenha123:

   ```bash
   node -e "require('bcrypt').hash('ExemploSenha123', 10).then(console.log)"
   ```

## Banco de Dados

O projeto utiliza PostgreSQL. O script SQL para criação da tabela users está disponível em database/schema.sql.

## Observações

Este projeto faz parte do meu processo de aprendizado em desenvolvimento back-end.