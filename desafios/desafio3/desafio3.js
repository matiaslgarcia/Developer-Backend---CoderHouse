const express = require('express')
const Contenedor = require('./contenedor')

const PORT = 8080
const app = express()
const contenedor = new Contenedor('./productos.txt')

const server = app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + PORT)
})

app.get('/productos', async (req,res) =>{
    contenedor.getAll().then(resp => 
        res.send(resp)
    )
})

app.get('/productoRandom', async (req,res) =>{
    let total;
    let prodRandom
    contenedor.getAll().then(r => {
       total = r.length
       prodRandom = Math.floor(Math.random() * total+1)
        contenedor.getById(prodRandom).then( prod =>{
            res.send(prod)
        })
    })
})