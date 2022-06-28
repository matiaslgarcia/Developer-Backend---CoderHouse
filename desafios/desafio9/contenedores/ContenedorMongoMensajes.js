import * as mensajes from "../models/mensaje.js"

export default class ContenedorMongoMensajes{
    
  constructor(connection) {
    this.connection = connection
  }

  async saveMessage(nuevoMensaje) {
    try {
        const newMensaje ={
          author: {
            "id": nuevoMensaje.id,
            "nombre": nuevoMensaje.nombre,
            "apellido": nuevoMensaje.apellido,
            "edad": nuevoMensaje.edad,
            "alias": nuevoMensaje.alias,
            "avatar": nuevoMensaje.avatar
          },
          "text": nuevoMensaje.text
        }
        await mensajes.mensajes.create(newMensaje)
    }catch(error){
      console.log(error)
    }
  }

  async getAllMessages(){
    try{
      return await mensajes.mensajes.find()
    }catch (e) {
      console.log(error)
    }
  }
}


