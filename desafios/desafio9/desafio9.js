const express = require('express')
const mongoose = require('mongoose')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const configuracionMariaDB = require('./mysqlconn')
const configuracionSQLite = require('./sqliteconn')
const knex1 = require('knex')(configuracionMariaDB.optionsMariaDB);
const knex2 = require('knex')(configuracionSQLite.optionSQLite);
const Contenedor = require('./contenedor')
const Mensajes = require('./ContenedorMongoMensajes')
const MetodosDB = require('./metodosDB')
const Producto = require('./utils/producto')
const { faker } = require('@faker-js/faker')
faker.locale = 'es'

const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.utluy.mongodb.net/?retryWrites=true&w=majority"
let conexion = mongoose.connect(URL);

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const producto = new Producto()

app.set('view engine', 'ejs')
 
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
const mensajes = new Mensajes(conexion)

//EndPoint
app.get('/', async (req, res) => {
    res.render('principal.ejs', {root: __dirname})
})


app.get('/api/productos-test' ,async (req, res) => {
  try{
    await producto.crearProductosParaFront().then(resp =>
      res.render('productosTest.ejs',{productos: resp, prodExists: resp.length !==0})
    )
  }catch (e) {
    res.send(e)
  }
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