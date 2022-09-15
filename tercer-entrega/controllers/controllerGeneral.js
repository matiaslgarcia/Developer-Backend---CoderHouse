import logger from '../utils/logger.js'
import services from "../services/servicesGeneral.js";

const allRoutes = async (req) =>{
  const{method, url} = req
  logger.error(`Error: ${-2}`)
  logger.warn(`El metodo ${method} no esta soportado`)
  logger.warn(`La ruta ${url} no esta implementada`)
}

const dirBarra = async (req, res) => {
  res.redirect('/landing')
}

const landing = async (req, res) => {
  res.render('principal.ejs', await services.getEmail(req))
}

export default {
  allRoutes,
  landing,
  dirBarra,
}
