class MetodosDB {
    constructor(knex, tableName) {
        this.knex= knex
        this.tableName = tableName
    }
    async crearTablaProductos() {
            this.knex.schema.dropTableIfExists(this.tableName)
              .finally(() => {
                  try {
                    return this.knex.schema.createTable(this.tableName, table => {
                        table.increments('id').primary()
                        table.string('title', 50).notNullable()
                        table.float('price', 10).notNullable()
                        table.string('thumbnail', 255).notNullable()
                    })
                  }catch (e) {
                      console.log('Error' + e)
                  }
              })
    }
    async crearTablaMensajes() {
            this.knex.schema.dropTableIfExists(this.tableName)
              .finally(() => {
                  try {
                      return this.knex.schema.createTable(this.tableName, table => {
                          table.increments('id').primary()
                          table.string('email', 50).notNullable()
                          table.string('message', 255).notNullable()
                          table.string('date', 20).notNullable()
                          table.string('hour', 10).notNullable()
                      })
                  }catch (e) {
                      console.log('Error' + e)
                  }
              })
    }
}

module.exports = MetodosDB