import conexion from "../DB/connectionMongo.js"
import ContenedorMongoMensajes from "../../contenedores/ContenedorMongoMensajes.js"

const mensajes = new ContenedorMongoMensajes(conexion)

export default mensajes