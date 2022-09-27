import mensajes from "../instances/instanciasMensaje.js";
import normalizarMensajes from "./normalizador.js";

export default async function getAllMessagesNormalized(){
  const mensajesNormalizados = await mensajes.getAllMessages()
  return normalizarMensajes({ id: 'mensajes', mensajesNormalizados})
}
