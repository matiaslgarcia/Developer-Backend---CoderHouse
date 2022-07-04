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

    const schemaAuthor = new schema.Entity(
      "authors",
      {},
      {idAttribute: "autores.id"}
    )
  const schemaMensaje = new schema.Entity(
    "text",
    {author: schemaAuthor},
    {idAttribute: "id"}
  )
  const schemaMensajes = new schema.Entity(
    "texts",
    {mensajes: [schemaMensaje]},
    {idAttribute: "id"}
  )

    console.log('Objeto normalizado')
    const normalizedMessages = normalize(autoresTodos, schemaAuthor)
    console.log(normalizedMessages)
    //console.log('Porcentaje de compresion: ' + (100- (JSON.stringify(normalizedMessages).length * 100 / JSON.stringify(autoresTodos).length)) + '%')
    // console.log('Longitud del objeto orginal: ' + JSON.stringify(autoresTodos).length)
    // console.log('Longitud del objeto normalizado: ' + JSON.stringify(normalizedMessages).length)

    // console.log('Objeto desnormalizado')
    // const desnormalizedMessages = denormalize(
    //   normalizedMessages.result,
    //   schemaMensajes,
    //   normalizedMessages.entities
    // )
    // console.log(desnormalizedMessages)
