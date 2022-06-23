class Mensajes {

  constructor(configuracion, tableName) {
    this.knex = configuracion;
    this.tableName = tableName;
  }

  async saveMessage(mensaje) {
    try {
        const newMensaje ={
          "email": mensaje.email,
          "message": mensaje.message,
          "date": mensaje.date,
          "hour": mensaje.hour,
        }
        this.knex(this.tableName).insert(newMensaje)
        .then(() => console.log('Se inserto el nuevo mensaje'))
        .catch((err) => {throw err})
    } catch(error) {
       throw error
    }
  }

  async getAllMessages(){
    try{
      return this.knex(this.tableName).select('*')
    }catch (e) {
      throw e
    }
  }
}

module.exports = Mensajes

