import mongoose from "mongoose";
import * as producto from './producto.js'

const cartCollection = "carritos"

// const CarritosSChema = new mongoose.Schema({
//   timestamps: Date,
//   product: []
// })

const CarritosSChema = new mongoose.Schema({
  timestamp: Date,
  product: [
    {
      productId: Number,
      timestamp: Date,
      name: { type: String, max: 100 },
      description: { type: String, max: 255 },
      code: { type: String, max: 20 },
      thumbnail: { type: String, max: 255 },
      price: { type: Number, max: 99999 },
      quantity: Number
    },
  ],
});

export const carritos = mongoose.model(cartCollection,CarritosSChema)