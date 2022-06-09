import mongoose from 'mongoose'

const userCollection = 'usuarios';

const UsuariosSchema = new mongoose.Schema({
  nombre: {type: String, required: true, max: 100},
  apellido: {type: String, required: true, max: 100},
  email: {type: String ,required: true, max: 100},
  usuario: {type: String, required: true, max: 100},
  password: {type: Number, required: true, min: 8},
})

export const usuarios = mongoose.model(userCollection,UsuariosSchema)