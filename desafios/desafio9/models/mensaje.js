const mongoose = require('mongoose');

const mensCollection = "mensajes"

const Mensaje = new mongoose.Schema({
    author:{
        id: Number,
        nombre: { type: String, max: 50 },
        apellido: { type: String, max: 50 },
        edad: Number,
        alias: { type: String, max: 30 },
        avatar: { type: String, max: 255 },
    },
    text: { type: String, max: 255 },
});

export const mensaje = mongoose.model(mensCollection,Mensaje)