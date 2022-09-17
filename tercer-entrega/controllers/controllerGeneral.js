import logger from '../utils/logger.js'
import services from "../services/servicesGeneral.js";
import user from "../instances/instanciaUsuario.js";

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
  const usuario =  await user.findUser(req.session.passport.user)
  res.render('principal.ejs', {
                                nombre: usuario.nombre,
                                direccion: usuario.direccion,
                                edad: usuario.edad,
                                email: usuario.email,
    })
}

export default {
  allRoutes,
  landing,
  dirBarra,
}
