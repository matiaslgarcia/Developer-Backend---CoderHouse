import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { createServer } from "http";
import { Server } from "socket.io";
import knex from 'knex'
import Contenedor from './contenedores/contenedor.js'
import MetodosDB from './metodosDB.js'
import Producto from './utils/producto.js'
import { faker } from '@faker-js/faker'
import ContenedorMongoMensajes from './contenedores/ContenedorMongoMensajes.js'
faker.locale = 'es'

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

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
app.use(express.urlencoded({extended:true}))

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://coderhouse:coderhouse@cluster0.utluy.mongodb.net/sessions?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: 'stringSecreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  })  
)
const httpServer = createServer(app)
const io = new Server(httpServer)

const producto = new Producto()

app.set('view engine', 'ejs')

//Instancias

const dbProduct = new MetodosDB(knex1, 'productos')
dbProduct.crearTablaProductos()
  .then(r => r)
  .catch(e => console.log('Error:' + e))

const contenedor = new Contenedor(knex1, 'productos')

const mensajes = new ContenedorMongoMensajes(conexion)

//MIDDLEWARE
app.use(express.static('./public'))
function autorizacionWeb(req, res, next) {
  if (req.session?.nombre) {
      next()
  } else {
      res.redirect('/login')
  }
}

//EndPoint

app.get('/', (req, res) => {
  res.redirect('/landing')
})

app.get('/login', (req, res) => {
  const nombre = req.session?.nombre
  if (nombre) {
      res.redirect('/')
  } else {
      res.render('principalLogueoUsuario.ejs')
  }
})

app.post('/login', (req, res) => {
  req.session.nombre = req.body.nombre
  res.redirect('/landing')
})

app.get('/logout', (req, res) => {
  const nombre = req.session?.nombre
  if (nombre) {
      req.session.destroy(err => {
          if (!err) {
              res.render('principalDeslogueo.ejs', { nombre })
          } else {
              res.redirect('/')
          }
      })
  } else {
      res.redirect('/')
  }
})

app.get('/landing', autorizacionWeb, (req, res) => {
  res.render('principal.ejs', { nombre: req.session.nombre })
})

app.get('/api/productos-test' ,async (req, res) => {
  try{
      res.render('productosTest.ejs',{productos: await producto.crearProductosParaFront(), 
                                      prodExists: await producto.crearProductosParaFront().length !==0})
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