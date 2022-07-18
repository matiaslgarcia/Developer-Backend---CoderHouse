import * as usuarios from "../models/usuario.js"

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
      console.log(error)
    }
  }

  async findUser(email){
    try {
      return await usuarios.usuarios.findOne({email: email})
    }catch (e) {
      console.log('Error al Buscar un Producto: ' + e)
    }
  }
}


