import autorizacionWeb from "../../utils/autenticacion.js"
import { Router } from "express"
import controller from "../../controllers/controllers.js";

const generarDireccionBarra = new Router()

generarDireccionBarra.get('/', autorizacionWeb, controller.dirBarra)

export default generarDireccionBarra
