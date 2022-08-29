import * as usuarios from "../../models/usuario.js"
import logger from '../../utils/logger.js'

export default class ContenedorMongoUsuarios{

  constructor(connection) {
    this.connection = connection
  }

  async saveUsuario(nuevoUsuario) {
    try {
        const newUsuario = {
            "email": nuevoUsuario.email,
            "password": nuevoUsuario.password,
        }
        await usuarios.usuarios.create(newUsuario)
    }catch(error){
      logger.error(error)
    }
  }

  async findUser(email){
    try {
      return await usuarios.usuarios.findOne({email: email})
    }catch (e) {
      logger.error('Error al Buscar un Producto: ' + e)
    }
  }
}


