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
      return this.knex(this.tableName).select('*')
    }catch (e) {
      console.log('Error' + e)
    }
  }

}

module.exports = Mensajes

