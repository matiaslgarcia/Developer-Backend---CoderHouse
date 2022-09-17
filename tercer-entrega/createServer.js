import express from "express";
import {sessionCfg} from "./config.js";
import { createServer as HttpServer} from "http";
import passport from "passport";
import {loginUser, registerUser} from "./routers/passport/auth.js";
import generarDireccionBarra from "./routers/endpoints/routerBarra.js";
import generarTodasLasRutas from "./routers/endpoints/routerAllRoutes.js";
import generarLanding from "./routers/endpoints/routerLanding.js";
import generarProductos from "./routers/endpoints/routerProducto.js";
import generarCarritos from "./routers/endpoints/routerCarrito.js";

export const createServer = async () =>{

//Instancias
  const app = express()
  const httpServer = HttpServer(app)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(express.static('./public'))
  app.set('view engine', 'ejs')

  app.use(sessionCfg)
  app.use(passport.initialize())
  app.use(passport.session())

  //EndPoint
    app.use(loginUser)
    app.use(registerUser)
    app.use(generarDireccionBarra)
    app.use(generarLanding)
    app.use('/api/productos', generarProductos)
    app.use('/api/carrito', generarCarritos)
    app.use(generarTodasLasRutas)



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
