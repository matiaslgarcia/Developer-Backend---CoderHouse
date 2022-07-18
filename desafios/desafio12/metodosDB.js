export default class MetodosDB {
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
}