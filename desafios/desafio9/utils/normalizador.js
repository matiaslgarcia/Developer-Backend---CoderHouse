import ContenedorMongoMensajes from "../contenedores/ContenedorMongoMensajes.js"
import cluster from 'cluster'
import { normalize, denormalize, schema } from 'normalizr'
import mongoose from 'mongoose'

const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.utluy.mongodb.net/?retryWrites=true&w=majority"
let conexion = mongoose.connect(URL);

const mensajes = new ContenedorMongoMensajes(conexion)
const aut = await mensajes.getAllMessages()

const autoresTodos = {
    id: "100000",
    autores : aut
}

const autores = new schema.Entity('authors', {}, { idAttribute: 'autores.id' })
console.log(autores)

const mens = new schema.Entity('texts', { idAttribute: 'autores.text' })
console.log(mens)

const organigrama = new schema.Entity('organigrama', {
    autor: autores,
    mensajes: [mens]
})

import util from 'util'

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}

console.log('Objeto normalizado')
const normalizedHolding = normalize(autoresTodos, organigrama)
print(normalizedHolding)