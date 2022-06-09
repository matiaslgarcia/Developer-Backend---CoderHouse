import mongoose from "mongoose";
import * as models from "./models/usuario";

CRUD()

async function CRUD() {
  try {
    const URL = "mongodb://localhost:27017/ecommerce"

    let conexion = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Conexion a MongoDB correcta')

    //Create
    const usuario = {nombre: 'Matias', apellido: 'Garcia', email: 'mtg@gmail.com', usuario:'matiaslgarcia', password: 123}
    const usuarioCreado = await models.usuarios.create(usuario)
    console.log('Usuario Creado: ' + usuarioCreado)

    //Read
    const usuarios = await  models.usuarios.find()
    console.log("Usuarios: ", usuarios)

    //UPDATE
    const usuarioActualizado = await models.usuarios.findByIdAndUpdate({nombre: "Matias"}, {nombre: "Luciano"})
    console.log("Usuario Actualizado: ", usuarioActualizado)

    //DELETE
    const usuarioEliminado = await models.usuarios.findByIdAndDelete({nombre:'Luciano'})
    console.log("Usuario Actualizado: ", usuarioEliminado)
  }catch (e) {
    console.log('Error: ', e)
  }
  finally {
    mongoose.disconnect()
  }
  console.log('Fin del programa')
}