class CreateTableCarrito {
    constructor(knex, tableName, foreignTable) {
        this.knex= knex
        this.tableName = tableName
        this.foreignTable = foreignTable
    }

    async crearTablaCarrito() {
        this.knex.schema.dropTableIfExists(this.tableName)
          .finally(() => {
              try {
                  return this.knex.schema.createTable(this.tableName, table => {
                      table.increments('id').primary()
                      table.timestamp('timestamp')
                      table.integer('cantProducts', 3).notNullable()
                      table.foreign('producto').references('id').inTable(this.foreignTable)
                  })
              }catch (e) {
                  console.log('Error' + e)
              }
          })
    }
}

module.exports = CreateTableCarrito
