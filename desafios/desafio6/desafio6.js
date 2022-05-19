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

//Instancias
const contenedor = new Contenedor('./productos.txt')
const mensajes = new Mensajes('./mensajes.txt')

//EndPoint
app.get('/', async (req, res) => {
    res.render('principal.ejs', {root: __dirname})
})

//SOCKET
io.on('connection', async (sockets) => {
  console.log(`Cliente con ID: ${sockets.id} se hace conectado`)

  const product = await contenedor.getAll()
  sockets.emit('products', product)

  sockets.on('new-product', async data => {
    await contenedor.save(data)
      io.sockets.emit('products',  await contenedor.getAll())
  })

  const messages = await mensajes.getAllMessages()
  sockets.emit('messages', messages)

  sockets.on('new-message', async data => {
    await mensajes.saveMessage(data)
    io.sockets.emit('messages', await mensajes.getAllMessages())
  })
})


//SERVER
const PORT = 8080
httpServer.listen(PORT, () =>   console.log('Servidor escuchando en el puerto ' + PORT))

