import mongoose from "mongoose";
import * as producto from './producto.js'

const cartCollection = "carritos"

const CarritosSChema = new mongoose.Schema({
  timestamps: Date,
  product: []
})

export const carritos = mongoose.model(cartCollection,CarritosSChema)