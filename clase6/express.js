const express = require('express')

const PORT = 8080

const app = express()

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenido al servidor express</h1>')
})

let cantVisitas = 0
app.get('/visitas', (req, res) => {
    cantVisitas++;
    res.send({mensaje: 'La cantidad de visitas es: ',cantVisitas})
})

app.get('/fyh', (req, res) => {
    res.send({fechayHora: new Date().toLocaleString()})
})