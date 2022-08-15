import winston from 'winston'

function buildProdLogger() {
  return winston.createLogger({
    transports: [
      new winston.transports.File({filename: 'warn.log', level: 'warn'}),
      new winston.transports.File({filename: 'error.log', level: 'error'}),
      new winston.transports.Console({level: 'info'}),
      new winston.transports.Console({level: 'warn'}),
      new winston.transports.Console({level: 'error'})
    ],
  })
}

function buildDevLogger() {
  return winston.createLogger({
    transports: [
      new winston.transports.Console({level: 'info'}),
      new winston.transports.Console({level: 'warn'}),
      new winston.transports.Console({level: 'error'})
    ],
  })
}

let logger = null

if (process.env.NODE_ENV === 'production') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

export default logger
