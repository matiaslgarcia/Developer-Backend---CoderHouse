import {conexion} from "../config.js"
import ContenedorMongoDBProducto from "../persistence/contenedores/ContenedorMongoDBProducto.js"

const contenedorProducto = new ContenedorMongoDBProducto(conexion)

export default contenedorProducto
