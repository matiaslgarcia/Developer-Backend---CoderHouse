import { Router } from "express"
import compression from 'compression'
import controller from "../../controllers/controllers.js";

const generarInfo = new Router()

generarInfo.get('/info' , controller.information)
generarInfo.get('/info-compression', compression(),controller.information)

export default generarInfo
