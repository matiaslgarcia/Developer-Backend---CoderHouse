import mongoose from "mongoose";

const productCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
    timestamp: Date.now(),
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 255},
    code: {type: Number, required: true, max: 20},
    thumbnail: {type: String, required: true, max: 255},
    price: {type: Number, required: true, max: 20},
    stock: {type: Number, required: true, max: 5},
})

export const productos = mongoose.model(productCollection,ProductosSchema)
