import { normalize, schema,} from 'normalizr'

const schemaAuthor = new schema.Entity("authors", {}, {idAttribute: "autores.id"})

const schemaMensaje = new schema.Entity("text", {author: schemaAuthor}, {idAttribute: "id"})

const schemaMensajes = new schema.Entity("texts",{mensajes: [schemaMensaje]},{idAttribute: "id"})

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)
export default normalizarMensajes
