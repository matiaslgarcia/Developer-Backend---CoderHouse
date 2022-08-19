import conexion from "../DB/connectionMongo.js"
import ContenedorMongoMensajes from "../persistence/contenedores/ContenedorMongoMensajes.js"

const mensajes = new ContenedorMongoMensajes(conexion)

export default mensajes
