import {productos} from '../../models/producto.js'

export default class ContenedorMongoDBProducto {
  constructor( connection) {
    this.connection = connection
  }

  async createProduct(prod){
    try {
      const product = {
        timestamp: prod.timestamp,
        name: prod.name,
        description: prod.description,
        code: prod.code,
        thumbnail: prod.thumbnail,
        price: prod.price,
        stock: prod.stock,
      }
      await productos.create(product)
    }catch (e) {
      console.log('Error al Crear un Producto: ' + e)
    }
  }

  async findProductById(id){
    try {
      return await productos.findOne({_id: id})
    }catch (e) {
      console.log('Error al Buscar un Producto: ' + e)
    }
  }

  async findProducts(){
    try {
      return await productos.find()
    }catch (e) {
      console.log('Error al Buscar un Producto: ' + e)
    }
  }

  async updateProductById(id, prod){
    try {
      await productos.findByIdAndUpdate({_id: id},{
        timestamp: prod.timestamp,
        name: prod.name,
        description: prod.description,
        code: prod.code,
        thumbnail: prod.thumbnail,
        price: prod.price,
        stock: prod.stock,
      })
    }catch (e) {
      console.log('Error al Actualizar un Producto: ' + e)
    }
  }

  async deleteProductById(id){
    try {
      await productos.findByIdAndDelete({_id: id})
    }catch (e){
      console.log('Error al Eliminar un Producto: ' + e)
    }
  }
}
