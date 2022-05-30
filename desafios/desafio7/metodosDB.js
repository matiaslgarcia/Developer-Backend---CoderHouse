const configuracionMariaDB = require('./mysqlconn')
const configuracionSQLite = require('./sqliteconn')

const knex1 = require('knex')(configuracionMariaDB.optionsMariaDB);
const knex2 = require('knex')(configuracionSQLite.optionSQLite); 

class MetodosDB { 

    crearTablaProductos() {
                return knex1.schema.createTable('productos', table => {
                    table.increments('id').primary()
                    table.string('title', 50).notNullable()
                    table.float('price', 10).notNullable()
                    table.string('thumbnail', 255).notNullable()
                    console.log("Tabla creada con exito")
                })
                
    }

    crearTablaMensajes() {
        return knex2.schema.createTable('mensajes', table => {
            table.increments('id').primary()
            table.string('email', 50).notNullable()
            table.string('messages', 255).notNullable()
            table.string('date',20).notNullable()
            table.string('hour', 10).notNullable()
        })
    }
}

module.exports = MetodosDB