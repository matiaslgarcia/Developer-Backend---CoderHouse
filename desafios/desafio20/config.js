import parseArgs from "yargs";
import dotenv from 'dotenv'
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from 'mongoose'

dotenv.config()

export const {puerto, modo } = parseArgs(process.argv.slice(2))
  .alias({
    p: 'puerto',
    m: 'modo',
  })
  .default({
    puerto: process.argv[2] || 8080,
    modo: process.argv[3] ||'FORK',
    NODE_ENV: 'production',
  })
  .argv


export const sessionCfg = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_SESSION,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 100000
  }
})

export const conexion = mongoose.connect(process.env.MONGO_URI);

export const optionsMariaDB = {
  client: process.env.CLIENT_SQL,
  connection: {
    host: process.env.HOST_SQL,
    user: process.env.USER_SQL,
    password: process.env.PASSWORD_SQL,
    database: process.env.DATABASE_SQL,
    ssl: {
      rejectUnauthorized:false
    }
  }
}
