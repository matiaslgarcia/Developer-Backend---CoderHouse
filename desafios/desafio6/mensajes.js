const fs = require('fs')

class Mensajes {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async saveMessage(mensaje) {
    try {
      const contenido =  JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))

      const newMensaje = {
        "email": mensaje.email,
        "message": mensaje.message,
        "date": mensaje.date,
        "hour": mensaje.hour,
      }
      let newMensajeFormat;
      if(contenido.length === 0) {
        newMensajeFormat = JSON.stringify(newMensaje)+ ']'
      }else{
        newMensajeFormat = ',' + JSON.stringify(newMensaje) + ']'
      }
      const newContenido = JSON.stringify(contenido).replace(']', newMensajeFormat);
      await fs.promises.writeFile(this.archivo, newContenido)
    } catch(error) {
      console.log('Error: ' + error)
    }
  }

  async getAllMessages(){
    try{
      return JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
    }catch (e) {
      console.log('Error' + e)
    }
  }
}

module.exports = Mensajes

