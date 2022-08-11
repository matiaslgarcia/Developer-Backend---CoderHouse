import winston from 'winston'

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'warn.log', level: 'warning' }),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  })
  return prodLogger
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: 'info' })],
    transports: [new winston.transports.Console({ level: 'warning' })],
    transports: [new winston.transports.Console({ level: 'error' })],
  })
  return devLogger
}

let logger = null

if (process.env.NODE_ENV === 'production') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

export default logger
