const express = require('express')
const { Router } = express

const PORT = 8080
const app = express()
const routerMascotas = new Router()
const routerPersonas = new Router()

app.use(express.static('public'))

routerMascotas.use(express.json())
routerPersonas.use(express.json())

routerMascotas.use(express.urlencoded({extended:true}))
routerPersonas.use(express.urlencoded({extended:true}))

const mascotas = []
const personas = []

routerMascotas.get('/', (req,res) =>{
    res.json(mascotas)
})
routerPersonas.get('/', (req,res) =>{
    res.json(personas)
})

routerMascotas.post('/', (req,res) =>{
    mascotas.push(req.body)
    res.json(mascotas)

})

routerPersonas.post('/', (req,res) =>{
   personas.push(req.body)
    res.json(personas)
})

app.use('/mascotas', routerMascotas) //ruta padre
app.use('/personas', routerPersonas)

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})

