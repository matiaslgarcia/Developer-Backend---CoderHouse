import contenedor from '../../api/instanciasProducto.js'

export default async function addProductsSocket(sockets, ioSockets){
    const product = await contenedor.getAllProducts()
    sockets.emit('products', product)

    sockets.on('new-product', async data => {
    await contenedor.insertProduct(data)
    ioSockets.emit('products', await contenedor.getAllProducts())
    })
}
    