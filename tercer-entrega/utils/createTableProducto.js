class CreateTableProducto {
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
                        table.string('name', 100).notNullable()
                        table.timestamp('timestamp')
                        table.string('descripcion', 255).notNullable()
                        table.integer('code', 20).notNullable()
                        table.string('thumbnail', 255).notNullable()
                        table.float('price', 20).notNullable()
                        table.integer('stock', 20).notNullable()
                    })
                  }catch (e) {
                      console.log('Error' + e)
                  }
              })
    }
}

module.exports = CreateTableProducto