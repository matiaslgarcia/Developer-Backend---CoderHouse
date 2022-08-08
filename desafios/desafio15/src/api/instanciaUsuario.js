import conexion from "../DB/connectionMongo.js"
import ContenedorMongoUsuarios from "../../contenedores/ContenedorMongoUsuarios.js"

const user = new ContenedorMongoUsuarios(conexion)

export default user