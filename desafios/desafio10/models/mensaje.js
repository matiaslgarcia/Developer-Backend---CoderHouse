import mongoose from 'mongoose'

const mensCollection = "mensajes";

const MensajeShema = new mongoose.Schema({
    author:{
        id: { type: String, max: 150 },
        nombre: { type: String, max: 50 },
        apellido: { type: String, max: 50 },
        edad: Number,
        alias: { type: String, max: 30 },
        avatar: { type: String, max: 255 },
    },
    text: { type: String, max: 255 },
})

export const mensajes = mongoose.model(mensCollection,MensajeShema)