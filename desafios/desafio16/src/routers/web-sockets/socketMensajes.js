import mensajes from '../../instances/instanciasMensaje.js'
import getAllMessagesNormalized from "../../utils/messagesNormalized.js";

export default async function addMessageSocket(sockets, ioSockets){
    const messages = await getAllMessagesNormalized()
    sockets.emit('messages', messages)

    sockets.on('new-message', async data => {
    await mensajes.saveMessage(data)
        ioSockets.emit('messages', await getAllMessagesNormalized())
    })
}
