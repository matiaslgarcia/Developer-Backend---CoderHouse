import conexion from "../DB/connectionMongo"

const mensajes = new ContenedorMongoMensajes(conexion)

export default mensajes