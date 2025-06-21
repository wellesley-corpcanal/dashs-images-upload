require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors'); // 1. Import the cors package
const routes = require('./routes');
const logger = require('./lib/Logger');

const app = express();

app.use(cors()); // 2. Add the cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

// Middleware de tratamento de erros global.
// Deve ser o último middleware a ser adicionado.
app.use((err, req, res, next) => {
  // Loga o erro com detalhes no nosso sistema de logging
  logger.error(err.message, { stack: err.stack });

  // Envia uma resposta genérica e segura para o cliente
  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'Ocorreu um erro inesperado no servidor.',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3333}`);
});