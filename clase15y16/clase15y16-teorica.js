/*
*  SQL Y Node.JS
*
* knex.js es un generador de consultas SQL
* Es un ORM
*
*  npm i knex mysql
* crear carpeta options con un archivo llamado "mysqlconn" que tendra la siguiente informacion:
*
* const options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'cursobackend',
        password: 'coderhouse',
        database: 'mibase'
    }
}

module.exports = {
    options
}

*
* */