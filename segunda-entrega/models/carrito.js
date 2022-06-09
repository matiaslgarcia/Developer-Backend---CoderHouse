import mongoose from "mongoose";
const ProductosSchema = require('./producto.js');

const cartCollection = "carritos"

const CarritosSChema = new mongoose.Schema({
  timestamp: Date.now(),
  product: {type: [ProductosSchema], required:true}
})

export const carritos = mongoose.model(cartCollection,CarritosSChema)