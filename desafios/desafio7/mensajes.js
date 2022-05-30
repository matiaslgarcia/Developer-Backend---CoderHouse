const { default: knex } = require("knex");

class Mensajes {
  constructor(configuracion, mensajes) {
    this.knex = configuracion;
    this.mensajes = mensajes;
  }

  async saveMessage(mensaje) {
    try {
     
      const newMensaje ={
        "email": mensaje.email,
        "message": mensaje.message,
        "date": mensaje.date,
        "hour": mensaje.hour,
      }

      this.knex(this.mensajes).insert(newMensaje)
      .then(() => console.log('Se inserto el nuevo mensaje'))
      .catch((err) => { console.log(err); throw err})
      .finally(() => {
          this.knex.destroy()
      })
    } catch(error) {
      console.log('Error: ' + error)
    }
  }

  async getAllMessages(){

    try{
      return this.knex(this.mensajes).select('*')
    }catch (e) {
      console.log('Error' + e)
    }
  }

}

module.exports = Mensajes

