import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

let conexion = mongoose.connect(process.env.MONGO_URI);

export default conexion