import { Router } from "express"
import autorizacionWeb from "../utils/autenticacion.js"
import compression from 'compression'
import routes from '../controllers/controllers.js'

const generarRandom = new Router()
const generarTodasLasRutas = new Router()
const generarDireccionBarra = new Router()
const generarInfo = new Router()
const generarLanding = new Router()
const productoTest = new Router()
const registerUser = new Router()
const loginUser = new Router()

generarTodasLasRutas.get('*', routes.allRoutes)
generarDireccionBarra.get('/', autorizacionWeb, routes.dirBarra)
generarInfo.get('/info-compression',compression(), routes.infoCompression)
generarInfo.get('/info', routes.info)
generarLanding.get('/landing', autorizacionWeb,routes.landing)
productoTest.get('/api/productos-test', routes.productTest)
generarRandom.get('/api/randoms/:cantidad?',routes.randomElements)

loginUser.post('/login', routes.passportLogin)
loginUser.get('/login',routes.loginUser)
loginUser.get('/faillogin', routes.faillogin )
loginUser.get('/logout', routes.logoutUser)

registerUser.post('/register', routes.passportRegister)
registerUser.get('/register', routes.registerUser)
registerUser.get('/failregister', routes.failRegister)

export default {
  generarTodasLasRutas,
  generarInfo,
  generarLanding,
  generarDireccionBarra,
  productoTest,
  generarRandom,
  loginUser,
  registerUser
}
