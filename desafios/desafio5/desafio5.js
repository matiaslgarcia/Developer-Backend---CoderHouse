const express = require('express')
const handlebars = require('express-handlebars')
const Contenedor = require('./contenedor')

const app = express()

app.engine('handlebars', handlebars.engine())

app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const contenedor = new Contenedor('./productos.txt')

app.get('/productos', async (req, res) => {
  const form = {
    hola: 'hola'
  }
  res.render('form',form)
})

app.post('/productos', async (req, res) => {
  const producto = req.body
  contenedor.save(producto)
    .then(p =>  res.json(p))
    .catch(e => res.error('Error al agregar un producto ' + e))
  res.redirect('/')
})



//SERVER
const PORT = 8080
app.listen(PORT, () => {
  console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})

