import express from "express";
import {sessionCfg} from "./config.js";
import { createServer as HttpServer} from "http";
import { Server as Socket} from "socket.io";
import passport from "passport";
import socketMensaje from "./src/routers/web-sockets/socketMensajes.js";
import socketProducto from "./src/routers/web-sockets/socketProductos.js";
import contenedor from "./src/instances/instanciasProducto.js";
import logger from  './src/utils/logger.js';
import {loginUser, registerUser} from "./src/routers/passport/auth.js";
import productoTest from "./src/routers/endpoints/routerProductosTest.js";
import generarInfo from "./src/routers/endpoints/routerInfo.js";
import generarDireccionBarra from "./src/routers/endpoints/routerBarra.js";
import generarTodasLasRutas from "./src/routers/endpoints/routerAllRoutes.js";
import generarRandom from "./src/routers/endpoints/routerRandom.js";
import generarLanding from "./src/routers/endpoints/routerLanding.js";

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
  app.use('/api', generarRandom)
  app.use('/api', productoTest)
  app.use(generarInfo)
  app.use(generarDireccionBarra)
  app.use(generarLanding)
  app.use(loginUser)
  app.use(registerUser)
  app.use(generarTodasLasRutas)

  //SOCKET
  setTimeout(() =>{
    io.on('connection', async (sockets) => {
     logger.info(`Cliente con ID: ${sockets.id} se hace conectado`)
      try {
        await socketMensaje(sockets, io.sockets)
        await socketProducto(sockets, io.sockets)
      }catch (e){
        logger.error('Error en el socket es: ' + e)
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
