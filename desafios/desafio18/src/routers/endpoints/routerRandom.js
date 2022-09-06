import { Router } from "express"
import controller from '../../controllers/controllers.js'

const generarRandom = new Router()

generarRandom.get('/randoms/:cantidad?', controller.randomElements)

export default generarRandom
