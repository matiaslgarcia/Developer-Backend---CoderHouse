import parseArgs from "yargs";
import dotenv from 'dotenv'
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config()

export const {puerto, modo, _ } = parseArgs(process.argv.slice(2))
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
