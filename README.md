# CRUD de Usuários com Node.js e Express

Mini-projeto desenvolvido com o objetivo de praticar os conceitos básicos de desenvolvimento back-end utilizando Node.js e Express.

## Funcionalidades

- Listar usuários.
- Cadastrar usuários.
- Atualizar usuários.
- Excluir usuários.

## Tecnologias

- Node.js
- Express

## Como executar

1. Clone este repositório.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

O servidor será iniciado em `http://localhost:3000`.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuarios` | Lista os usuários |
| POST | `/usuarios` | Cadastra um usuário |
| PUT | `/usuarios/:id` | Atualiza um usuário |
| DELETE | `/usuarios/:id` | Exclui um usuário |

## Observações

Os dados são armazenados em memória, em um array, e não persistem após o encerramento do servidor.

Este projeto faz parte do meu processo de aprendizado em desenvolvimento back-end.