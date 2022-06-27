const mensajes = require("./models/mensaje.js")

class ContenedorMongoMensajes{
    constructor(connection) {
    this.connection = connection;
  }

  async saveMessage(nuevoMensaje) {
    try {
        const newMensaje ={
          author: {
            "id": nuevoMensaje.email,
            "nombre": nuevoMensaje.nombre,
            "apellido": nuevoMensaje.apellido,
            "edad": nuevoMensaje.edad,
            "alias": nuevoMensaje.alias,
            "avatar": nuevoMensaje.avatar
          },
          "text": nuevoMensaje.mensaje 
        }
        await mensajes.mensaje.create(newMensaje)
    }catch(error){
      console.log(error)
    }
  }

  async getAllMessages(){
    try{
      return await mensajes.mensaje.find()
    }catch (e) {
      console.log(error)
    }
  }
}

module.exports = Mensajes

