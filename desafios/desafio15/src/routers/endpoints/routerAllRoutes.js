import { Router } from "express"
import logger from  '../../../utils/logger.js'

const generarTodasLasRutas = new Router()

generarTodasLasRutas.get('*', (req, res) => {
  const{ url, method} = req
  logger.warn('ruta no implementada')
})

export default generarTodasLasRutas
