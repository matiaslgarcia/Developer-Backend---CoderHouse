import { Router } from "express"
import controller from "../../controllers/controllerGeneral.js";

const generarTodasLasRutas = new Router()

generarTodasLasRutas.all('*', controller.allRoutes)

export default generarTodasLasRutas
