import {conexion} from "../config.js"
import ContenedorMongoUsuarios from "../persistence/contenedores/ContenedorMongoUsuarios.js"

const user = new ContenedorMongoUsuarios(conexion)

export default user
