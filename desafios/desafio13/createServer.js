import express from "express";
import {sessionCfg} from "./config.js";
import { createServer as HttpServer} from "http";
import { Server as Socket} from "socket.io";
import passport from "passport";
import {loginUser, registerUser} from "./src/routers/passport/auth.js";
import generarInfo from "./src/routers/endpoints/routerInfo.js";
import generarDireccionBarra from "./src/routers/endpoints/routerBarra.js";
import generarLanding from "./src/routers/endpoints/routerLanding.js";
import generarRandom from "./src/routers/endpoints/routerRandom.js";
import productoTest from "./src/routers/endpoints/routerProductosTest.js";
import socketMensaje from "./src/routers/web-sockets/socketMensajes.js";
import socketProducto from "./src/routers/web-sockets/socketProductos.js";
import contenedor from "./src/api/instanciasProducto.js";

export const createServer = async () =>{

//Instancias
  await contenedor.crearTablaProductos()
  const app = express()
  const httpServer = HttpServer(app)
  const io = new Socket(httpServer)


  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(express.static('./public'))
  app.set('view engine', 'ejs')

  app.use(sessionCfg)
  app.use(passport.initialize())
  app.use(passport.session())

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

  return {
      handler: port => new Promise((resolve, reject) => {
          const connectedServer = httpServer.listen(port, () => {
            resolve(connectedServer)
          })
          connectedServer.on('error', error => {
            reject(error)
          })
        })
      }
}
