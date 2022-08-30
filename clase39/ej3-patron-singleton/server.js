import express from 'express'
import * as controlador from './controllers/controller-persona.js'


const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//rutas html on wire (front dentro del back)

app.get('/html-onwire', controlador.getHTMLOnwire)
app.post('/html-onwire', controlador.postHTMLOnwire)

//rutas Data on wire (front separado del back)

app.get('/data-onwire', controlador.getDataOnwire)
app.post('/data-onwire', controlador.postDataOnwire)
app.get('data-json', controlador.getDataJSON)

// -------------------------------------------------------
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>{
  console.log('Server escuchando en puerto ', PORT)
})

server.on('error', (e) =>{
  console.log(e)
})
