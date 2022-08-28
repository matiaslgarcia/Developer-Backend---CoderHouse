import mongoose from 'mongoose'

const usuarioCollection = "usuarios";

const UsuarioShema = new mongoose.Schema({
    email: { type: String, max: 50 },
    passwordHash: { type: String, max: 50 },
    nombre: { type: String, max: 40 },
    direccion: { type: String, max: 50 },
    edad: { type: Number },
    telefono: { type: Number },
    foto: {
        data: Buffer,
        contentType: String
    }
})

export const usuarios = mongoose.model(usuarioCollection,UsuarioShema)
