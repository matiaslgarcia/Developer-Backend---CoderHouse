// import express from 'express'
// import cookieParser from 'cookie-parser'
//
// const app = express()
// app.use(express.json())
// app.use(cookieParser('coderhouse'))
//
// app.post('/cookies', (req,res) =>{
//   const {nombre, valor, tiempo, firma} = req.body
//   if(!nombre || !valor){
//     return res.json({error: 'falta nombre o valor'})
//   }
//   if(tiempo){
//     res.cookie(nombre,valor, {signed: firma, maxAge: 1000*parseInt(tiempo)})
//   }else{
//     res.cookie(nombre,valor, {signed: firma})
//   }
//   res.json({proceso: 'ok'})
// })
// app.get('/cookies', (req,res) =>{
//
//   res.json({noFirmadas: req.cookies, firmadas: req.signedCookies})
// })
//
// app.delete('/cookies/:nombre', (req,res) =>{
//   const {nombre} = req.params
//   if(!req.cookies(nombre) && !req.signedCookies(nombre)){
//     res.json({error: 'nombre invalido'})
//   }else {
//     res.clearCookie(nombre)
//     res.json({proceso: 'ok'})
//   }
// })
//
// const PORT = 8080
// const server = app.listen(PORT, () =>{
//   console.log('servidor corriendo')
// })

import express from 'express'
import session from 'express-session'

const app = express()

app.use(
  session({
    secret: 'obiwankenobi',
    resave: false,
    saveUninitialized: false,
  })
)

app.get('/', (req, res) => {

  if (req.session.contador) {
    req.session.contador++

    res.send(`${req.session.nombre}, visitaste la pagina ${req.session.contador} veces`)
  } else {
    req.session.contador = 1
    req.session.nombre = req.query.nombre || 'Anakin'

    res.send(`Hello there. ${req.session.nombre}`)
  }
})

app.get('/olvidar', (req, res) => {
  const nombre = req.session.nombre
  req.session.destroy( err => {
    if (err) {
      res.json({error: 'olvidar', descripcion: err})
    } else {
      res.send(`Hasta luego ${nombre}`)
    }
  })
})

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log('Servidor escuchando en el ', PORT)
})