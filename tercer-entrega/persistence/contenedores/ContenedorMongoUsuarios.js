import {usuarios} from "../../models/usuario.js"
import logger from '../../utils/logger.js'

export default class ContenedorMongoUsuarios{

  constructor(connection) {
    this.connection = connection
  }

  async saveUsuario(nuevoUsuario) {
    try {
        const newUsuario = {
          "email": nuevoUsuario.email,
          "password": nuevoUsuario.passwordHash,
          "nombre": nuevoUsuario.nombre,
          "direccion": nuevoUsuario.direccion,
          "edad": nuevoUsuario.edad,
          "telefono": nuevoUsuario.telefono,
          "foto": nuevoUsuario.foto
        }
        await usuarios.create(newUsuario)
    }catch(error){
      logger.error(error)
    }
  }

  async findUser(email){
    try {
      return await usuarios.findOne({email: email})
    }catch (e) {
      logger.error('Error al Buscar un Usuario: ' + e)
    }
  }
}


