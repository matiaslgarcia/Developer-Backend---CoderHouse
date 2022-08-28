import {conexion} from "../config.js"
import ContenedorMongoDBCarrito from "../persistence/contenedores/ContenedorMongoDBCarrito.js"

const contenedorCarrito = new ContenedorMongoDBCarrito(conexion)

export default contenedorCarrito