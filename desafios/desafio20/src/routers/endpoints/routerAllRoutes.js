import { Router } from "express"
import controller from "../../controllers/controllers.js";

const generarTodasLasRutas = new Router()

generarTodasLasRutas.get('*', controller.allRoutes)

export default generarTodasLasRutas
