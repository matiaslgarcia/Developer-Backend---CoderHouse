import mongoose from "mongoose";

const productCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
    timestamps: Date,
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 255},
    code: {type: String, required: true, max: 20},
    thumbnail: {type: String, required: true, max: 255},
    price: {type: Number, required: true, max: 99999},
    stock: {type: Number, required: true, max: 9999},
})

export const productos = mongoose.model(productCollection,ProductosSchema)
