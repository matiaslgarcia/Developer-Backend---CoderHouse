import express from 'express'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { createServer } from "http";
import { Server } from "socket.io";
import passport from 'passport'
import dotenv from 'dotenv'
import parseArgs from 'yargs'
import cluster from 'cluster'
import * as os from 'os'
import socketMensaje from "./src/routers/web-sockets/socketMensajes.js"
import socketProducto from "./src/routers/web-sockets/socketProductos.js"
import contenedor from './src/api/instanciasProducto.js'
import {loginUser , registerUser } from './src/routers/passport/auth.js'
import productoTest from './src/routers/endpoints/routerProductosTest.js'
import generarRandom from './src/routers/endpoints/routerRandom.js'
import generarInfo from './src/routers/endpoints/routerInfo.js'
import generarDireccionBarra from './src/routers/endpoints/routerBarra.js'
import generarLanding from './src/routers/endpoints/routerLanding.js'

dotenv.config()
 
//Instancias
await contenedor.crearTablaProductos()

//MIDDLEWARE
const app = express()
const router = express.Router()
app.use('/api', router)

app.use(
  session({
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
)

const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//EndPoint
app.use(loginUser)
app.use(registerUser)
app.use(productoTest)
app.use(generarRandom)
app.use(generarInfo)
app.use(generarDireccionBarra)
app.use(generarLanding)

//SOCKET
setTimeout(() =>{
  io.on('connection', async (sockets) => {
    console.log(`Cliente con ID: ${sockets.id} se hace conectado`)
    try {
      socketMensaje(sockets,io.sockets)
      socketProducto(sockets,io.sockets)
    }catch (e){
      console.log('Error en el socket es: ' + e)
    }
  })
},1000)

//SERVER
const configuracion_puerto = parseArgs(process.argv.slice(2))

const {modo, puerto, _ } = configuracion_puerto
    .alias({
        m: 'modo',
        p: 'puerto',
    })
    .default({
        modo: process.argv[3] === 'FORK',
        puerto: 8080,
    })
    .argv

httpServer.listen({modo,puerto}, () =>   console.log('Servidor escuchando en el puerto ' + puerto + ' en modo: ' + modo))