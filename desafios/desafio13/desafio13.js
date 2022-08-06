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

const modoCluster = process.argv[3] == 'CLUSTER'

//Instancias
await contenedor.crearTablaProductos()

if(modoCluster && cluster.isPrimary) {
  const numCpus = os.cpus().length

  console.log('Numero de procesadores: ' + numCpus)
  console.log('ID DE PROCESO:' + process.pid)

  for(let i=0; i<numCpus; i++) {
      cluster.fork()
  }

  cluster.on('exit', worker => {
      console.log('Worker ' + process.pid + ' murio')
      cluster.fork()
  })
}else {

    //MIDDLEWARE
    const app = express()

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
      app.use(registerUser)
      app.use(loginUser)
      app.use(generarInfo)
      app.use(generarDireccionBarra)
      app.use(generarLanding)
      app.use('/api', generarRandom)
      app.use('/api', productoTest)

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

      //SERVER CONFIG
      const configuracion_puerto = parseArgs(process.argv.slice(3))

      const {puerto, modo, _ } = configuracion_puerto
          .alias({
              p: 'puerto',
              m: 'modo',
          })
          .default({
              puerto: process.argv[2] || 8080,
              modo: process.argv[3] || 'FORK',
          })
          .argv

      httpServer.listen(puerto, () => console.log('Servidor escuchando en el puerto ' + puerto ))
}

// -------------- MODO FORK -------------------
//pm2 start server.js --name="Server1" --watch -- 8081 FORK

// -------------- MODO CLUSTER -------------------
//pm2 start server.js --name="Server2" --watch -- 8082 CLUSTER

//Si hay problemas de ejecucion por bloqueo del sistema, ejecutar PowerShell en modo admin
// y ejecutar: Set-ExecutionPolicy Unrestricted

//pm2 list
//pm2 delete id/name
//pm2 desc name
//pm2 monit
//pm2 --help
//pm2 logs
//pm2 flush