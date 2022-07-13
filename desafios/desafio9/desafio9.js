import express from 'express'
import mongoose from 'mongoose'
import path from 'path';
import { createServer } from "http";
import { Server } from "socket.io";
import knex from 'knex'
import Contenedor from './contenedores/contenedor.js'
import MetodosDB from './metodosDB.js'
import Producto from './utils/producto.js'
import { faker } from '@faker-js/faker'
import ContenedorMongoMensajes from './contenedores/ContenedorMongoMensajes.js'
import { normalize, schema,} from 'normalizr'
faker.locale = 'es'

const __dirname = path.resolve();
const optionsMariaDB = {
  client: 'mysql',
  connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'productosdb'
  }
}
const knex1 = knex(optionsMariaDB)

const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.utluy.mongodb.net/?retryWrites=true&w=majority"
let conexion = mongoose.connect(URL);

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const producto = new Producto()

app.set('view engine', 'ejs')
 
//MIDDLEWARE
app.use(express.static('./public'))

//Instancias
const dbProduct = new MetodosDB(knex1, 'productos')
dbProduct.crearTablaProductos()
  .then(r => r)
  .catch(e => console.log('Error:' + e))

const contenedor = new Contenedor(knex1, 'productos')

const mensaje = new ContenedorMongoMensajes(conexion)

async function getAllMessagesNormalized(){
  const mensajesNormalizados = await mensaje.getAllMessages()
  return normalizarMensajes({ id: 'mensajes', mensajesNormalizados})
}

// Normalizacion ------------------------------------------------------------------------
const schemaAuthor = new schema.Entity("authors", {}, {idAttribute: "autores.id"})

const schemaMensaje = new schema.Entity("text", {author: schemaAuthor}, {idAttribute: "id"})

const schemaMensajes = new schema.Entity("texts",{mensajes: [schemaMensaje]},{idAttribute: "id"})

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)
//---------------------------------------------------------------------------------------

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

        const messages = await getAllMessagesNormalized()
        sockets.emit('messages', messages)

        sockets.on('new-message', async data => {
          await mensaje.saveMessage(data)
          io.sockets.emit('messages', await getAllMessagesNormalized())
        })
      }catch (e){
        console.log('Error en el socket es: ' + e)
      }
    })
  },1000)


//SERVER
const PORT = 8080
httpServer.listen(PORT, () =>   console.log('Servidor escuchando en el puerto ' + PORT))
