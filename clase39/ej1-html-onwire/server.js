import express from 'express'
import * as controlador from './controllers/controller-persona.js'


const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//rutas

app.get('/html-onwire', controlador.getHTMLOnwire)
app.post('/html-onwire', controlador.postHTMLOnwire)

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>{
  console.log('Server escuchando en puerto ', PORT)
})

server.on('error', (e) =>{
  console.log(e)
})
