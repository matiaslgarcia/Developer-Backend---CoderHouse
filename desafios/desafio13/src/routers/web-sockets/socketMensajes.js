import mensajes from '../../api/instanciasMensaje.js'

export default async function addMessageSocket(sockets, ioSockets){
    const messages = await mensajes.getAllMessages()
    sockets.emit('messages', messages)

    sockets.on('new-message', async data => {
    await mensajes.saveMessage(data)
        ioSockets.emit('messages', await mensajes.getAllMessages())
    })
}