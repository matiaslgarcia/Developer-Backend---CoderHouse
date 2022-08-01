import conexion from "../DB/connectionMongo"
import ContenedorMongoUsuarios from "../../contenedores/ContenedorMongoUsuarios"

const user = new ContenedorMongoUsuarios(conexion)

export default user