import mongoose from 'mongoose'

const usuarioCollection = "usuarios";

const UsuarioShema = new mongoose.Schema({
    email: { type: String, max: 50 },
    passwordHash: { type: String, max: 50 },
})

export const usuarios = mongoose.model(usuarioCollection,UsuarioShema)
