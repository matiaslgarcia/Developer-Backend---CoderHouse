const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const Contenedor = require('./contenedor')
const Mensajes = require('./mensajes')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.set('view engine', 'ejs')

//MIDDLEWARE
app.use(express.static('./public'))
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

//Instancias
const contenedor = new Contenedor('./productos.txt')
const mensajes = new Mensajes('./mensajes.txt')

//EndPoint
app.get('/', (req, res) => {
    res.render('principal.ejs', {root: __dirname})
})

//SOCKET
io.on('connection', async (socket) => {
  console.log(socket.data)
  const product = [
    {"title":"Ketchup",
    "price":"24",
    "thumbnail":"https://cdn0.iconfinder.com/data/icons/vectr-examples/640/food-ketchup-v1-512.png"}
  ]
  // const product = await contenedor.getAll()
  socket.emit('products', product)
  console.log(product)

  socket.on('new-product', async data => {
    console.log(data)
    await contenedor.save(data)
      io.sockets.emit('products', product)
  })
})

// io.on('connection', (socket) => {
//   console.log('Un cliente se ha conectado!')
//   const allMensajes = mensajes.getAllMessages()
//
//   socket.emit('messages', allMensajes)
//
//   socket.on('new-message', async data => {
//     await mensajes.saveMessage(data)
//
//     io.sockets.emit('messages', allMensajes)
//   })
// })

//SERVER
const PORT = 8080
httpServer.listen(PORT, () =>   console.log('Servidor escuchando en el puerto ' + PORT))

