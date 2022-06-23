const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const configuracionMariaDB = require('./mysqlconn')
const configuracionSQLite = require('./sqliteconn')
const knex1 = require('knex')(configuracionMariaDB.optionsMariaDB);
const knex2 = require('knex')(configuracionSQLite.optionSQLite);
const Contenedor = require('./contenedor')
const Mensajes = require('./mensajes')
const MetodosDB = require('./metodosDB')
const { faker } = require('@faker-js/faker')
faker.locale = 'es'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const variable = require('./generadorDeProductos')

app.set('view engine', 'ejs')

function generarProductos(){
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.food()
    }
}

//MIDDLEWARE
app.use(express.static('./public'))

//Instancias
const dbProduct = new MetodosDB(knex1, 'productos')
dbProduct.crearTablaProductos()
  .then(r => r)
  .catch(e => console.log('Error:' + e))
const dbMessage = new MetodosDB(knex2,'mensajes')
dbMessage.crearTablaMensajes()
  .then(r => r)
  .catch(e => console.log('Error:' + e))

const contenedor = new Contenedor(knex1, 'productos')
const mensajes = new Mensajes(knex2, 'mensajes')

//EndPoint
app.get('/', async (req, res) => {
    res.render('principal.ejs', {root: __dirname})
})

app.get('/api/productos-test' , (req, res) => {
    console.log(generarProductos())
    res.render('productosTest.ejs')
})

//SOCKET
setTimeout(() =>{
    io.on('connection', async (sockets) => {
      console.log(`Cliente con ID: ${sockets.id} se hace conectado`)
      try {
        const product = await contenedor.getAllProducts()
        sockets.emit('products', product)

        sockets.on('new-product', async data => {
          await contenedor.insertProduct(data)
          io.sockets.emit('products', await contenedor.getAllProducts())
        })

        const messages = await mensajes.getAllMessages()
        sockets.emit('messages', messages)

        sockets.on('new-message', async data => {
          await mensajes.saveMessage(data)
          io.sockets.emit('messages', await mensajes.getAllMessages())
        })
      }catch (e){
        console.log('Error en el socket es: ' + e)
      }
    })
  },1000)


//SERVER
const PORT = 8080
httpServer.listen(PORT, () =>   console.log('Servidor escuchando en el puerto ' + PORT))