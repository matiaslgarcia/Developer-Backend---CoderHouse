const express = require('express')
const PORT = 8080

const app = express()
const frase = 'hola mundo como estan?'

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})

app.get('/api/frase', (req, res) => {
    res.send({frase: frase})
})

app.get('/api/letras/:num', (req,res) =>{
    let letraBuscada;
    letraBuscada = frase.charAt(req.params.num)
    res.send({letra: letraBuscada})
})

app.get('/api/palabras/:num', (req, res) => {
    const arraySalida = frase.split(' ')
    let palabra;
    palabra = arraySalida[req.params.num-1]
    res.send({palabra: palabra})
})

