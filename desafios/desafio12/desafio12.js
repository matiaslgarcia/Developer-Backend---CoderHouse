import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { createServer } from "http";
import { Server } from "socket.io";
import knex from 'knex'
import Contenedor from './contenedores/contenedor.js'
import MetodosDB from './metodosDB.js'
import Producto from './utils/producto.js'
import { faker } from '@faker-js/faker'
import ContenedorMongoMensajes from './contenedores/ContenedorMongoMensajes.js'
import ContenedorMongoUsuarios from './contenedores/ContenedorMongoUsuarios.js'
import Informacion from './utils/informacion.js'
import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import dotenv from 'dotenv'
import parseArgs from 'yargs'
import { fork } from 'child_process'
import path from 'path'
faker.locale = 'es'

dotenv.config()

const optionsMariaDB = {
  client: process.env.CLIENT_SQL,
  connection: {
      host: process.env.HOST_SQL,
      user: process.env.USER_SQL,
      password: process.env.PASSWORD_SQL,
      database: process.env.DATABASE_SQL
  }
}
const knex1 = knex(optionsMariaDB)

const URL = process.env.MONGO_URI
let conexion = mongoose.connect(URL);
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
//Instancias
const dbProduct = new MetodosDB(knex1, 'productos')
await dbProduct.crearTablaProductos()
const contenedor = new Contenedor(knex1, 'productos')

const mensajes = new ContenedorMongoMensajes(conexion)
const producto = new Producto()
const user = new ContenedorMongoUsuarios(conexion)
const info = new Informacion()

//MIDDLEWARE
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
      email: email,
      password: password,
    }
    await user.saveUsuario(userNuevo)
    return done(null, userNuevo)
  }
))

passport.use('login', new LocalStrategy({
  passReqToCallback: true
}, async (req, password,done) => {
  const {email} = req.body;
  const usuario = await user.findUser(email)
  console.log(usuario)
  if(!usuario){
    return done(null,false)
  }
  if(usuario.password !== password){
    return done(null,false)
  }
  return done(null,usuario)
}))

const app = express()
const router = express.Router()
app.use('/api', router)

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI_SESSION,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }
  })  
)

passport.serializeUser(function (usuario,done){
  done(null,usuario.email)
})

passport.deserializeUser( async function (email, done){
  const usuario = await user.findUser(email)
  done(null, usuario)
})

const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

function autorizacionWeb(req, res, next) {
  if(req.isAuthenticated()){
      next()
  } else {
      res.redirect('/login')
  }
}

//EndPoint
//Para login

app.get('/', autorizacionWeb, (req, res) => {
    res.redirect('/landing')
})

app.get('/logout', (req, res) => {
  const email = req.session?.email
  if (email) {
      req.session.destroy(err => {
          if (!err) {
              res.render('principalDeslogueo.ejs', { email })
          } else {
              res.redirect('/')
          }
      })
  } else {
      res.redirect('/')
  }
})

app.get('/landing', autorizacionWeb, (req, res) => {
  res.render('principal.ejs', { email: req.session.email })
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
app.get('/faillogin',(req,res) => {
  res.render('principalErrorLogin.ejs')
})

app.post('/login',passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/landing'}))

app.get('/register', async (req, res) => {
  res.render('principalRegistrarUsuario.ejs')
})

app.get('/failregister',(req,res) => {
  res.render('principalErrorSignup.ejs')
})

app.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect:'/'}))

app.get('/info' ,async (req, res) => {
  try{
      res.render('principalInfo.ejs',{informacion: await info.solicitarInformacion()})
  }catch (e) {
    res.send(e)
  }
})

router.get('/randoms/:cantidad?', (req, res) => {
  const computo = fork(path.resolve(process.cwd(),'./utils/random.js'))
  const cantidad = req.params.cantidad || 100000000
  computo.on('message', resultado => {
      if (resultado === 'preparado') {
          computo.send(cantidad)
      } else {
          res.json({ resultado })
      }
  })
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

const configuracion_puerto = parseArgs(process.argv.slice(2))

const { puerto, _ } = configuracion_puerto 
    .alias({
        p: 'puerto',
    })
    .default({
        puerto: 8080,
    })
    .argv

httpServer.listen(puerto, () =>   console.log('Servidor escuchando en el puerto ' + puerto))