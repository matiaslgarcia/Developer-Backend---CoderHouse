const { faker } = require('@faker-js/faker')

class Producto{
    async createProduct(prod){
        const newProducto = {
            "title":prod.title,
            "price":prod.price,
            "thumbnail": prod.thumbnail
        }
        return newProducto
    }

    async crearProductosParaFront() {
        let productos=[]
        for (let i = 0; i < 5; i++) {
            const prod = await this.createProduct({
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.food()
            })
            productos.push(prod)        
        }
        return productos
    }
}
module.exports=Producto