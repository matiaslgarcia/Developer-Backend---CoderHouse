import mongoose from "mongoose";
import * as models from './models/usuario.js'

readFromDB()
async function readFromDB(){

  try {
    const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.utluy.mongodb.net/?retryWrites=true&w=majority"

    let conexion = await mongoose.connect(URL);
    console.log("Conexion exitosa");

    // Read usuarios
    const usuarios = await models.usuarios.find();
    console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
}


