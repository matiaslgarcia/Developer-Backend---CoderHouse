import autorizacionWeb from "../../utils/autenticacion.js"
import { Router } from "express"
import controller from "../../controllers/controllerGeneral.js";

const generarLanding = new Router()

generarLanding.get('/landing', autorizacionWeb,controller.landing)

export default generarLanding
