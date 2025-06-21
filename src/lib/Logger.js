const winston = require('winston');

const logger = winston.createLogger({
  level: 'error', // Nível mínimo de log para ser registrado
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    // Imprime os logs de erro no console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, timestamp, stack }) => {
            if (stack) {
              // Imprime a mensagem de erro e a pilha de chamadas (stack trace)
              return `${timestamp} ${level}: ${message}\n${stack}`;
            }
            return `${timestamp} ${level}: ${message}`;
          }
        )
      )
    })
  ],
});

module.exports = logger; 