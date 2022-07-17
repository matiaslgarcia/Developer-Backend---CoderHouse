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
import ContenedorMongoUsuarios from './contenedores/ContenedorMongoUsuarios.js'
import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
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

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

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
      maxAge: 100000
    }
  })  
)
const httpServer = createServer(app)
const io = new Server(httpServer)

const producto = new Producto()

app.set('view engine', 'ejs')
 
//MIDDLEWARE
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Instancias
const dbProduct = new MetodosDB(knex1, 'productos')
dbProduct.crearTablaProductos()
  .then(r => r)
  .catch(e => console.log('Error:' + e))

const contenedor = new Contenedor(knex1, 'productos')

const mensajes = new ContenedorMongoMensajes(conexion)

const user = new ContenedorMongoUsuarios(conexion)

passport.use('register', new LocalStrategy({
  passReqToCallback: true
  },async (req, password, done) => {
      const { email } = req.body
      const usuario = await user.findUser(email)
      console.log(usuario)
      if(usuario){
          return done('Usuario registrado')
      }
      const userNuevo = {
          username: email,
          password: password,
      }
      await user.saveUsuario(userNuevo)
      return done(null, userNuevo)
  }
))

passport.use('login', new LocalStrategy(
  async (req, password,done) => {
    const {email} = req.body;
    const usuario = await user.findUser(email)
      if(!usuario){
          return done(null,false)
      }
      if(usuario.password != password){
          return done(null,false)
      }
    return done(null,usuario)
}))

passport.serializeUser(function (req,done){
  const {email} = req.email
  done(null,email)
})

passport.deserializeUser( async function (req, done){
  const {email} = req.email
  const usuario = await user.findUser(email)
  done(null, usuario)
})

function autorizacionWeb(req, res, next) {
  if (req.session?.nombre) {
      next()
  } else {
      res.redirect('/login')
  }
}

app.use(passport.initialize())
app.use(passport.session())
//EndPoint
//Para login

app.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/landing')
  }else{
    res.redirect('/login')
  }
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

app.get('/login', (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/landing')
  }
  res.render('principalLogueoUsuario.ejs')
})

app.post('/login', (req, res) => {
  const { nombre, password } = req.body
  const existe = user.findUser(nombre)
  if(existe){
    return res.redirect('/landing')
  }
  const usuario = { 
    email: nombre,
    password: password 
  }
  user.saveUsuario(usuario)
  return res.redirect('/landing')
})

app.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect:'/'}))

app.get('/register', async (req, res) => {
  res.render('principalRegistrarUsuario.ejs')
})

app.get('/failregister',(req,res) => {
  res.render('principalErrorLogin.ejs')
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
        console.log(messages)
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
