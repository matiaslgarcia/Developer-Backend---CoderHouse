import * as carrito from "../models/carrito.js";

class ContenedorMongoDBCarrito {
  constructor(connection) {
    this.connection = connection;
  }

  async createCart(){
    try {
      const cart = {
        product: [],
      }
      await carrito.carritos.create(cart)
    }catch (e){
      console.log('Error al crear un Carrito: ' ,e)
    }
  }

  async deleteCartById(id){
    try {
      await carrito.carritos.findByIdAndDelete({id})
    }catch (e){
      console.log('Error al Eliminar un Carrito: ' + e)
    }
  }

  async findCartById(id){
    try {
      await carrito.carritos.findOne({_id: id})
    }catch (e) {
      console.log('Error al Buscar un Carrito: ' + e)
    }
  }

  async insertProductToCart(idCart, prod){
    try {
      const getProducts = await carrito.carritos.find({_id: idCart},{_id:0, product:1})
      const createProduct = {
        name: prod.name,
        description: prod.description,
        code: prod.code,
        thumbnail: prod.thumbnail,
        price: prod.price,
        stock: prod.stock,
      }
      const addProduct = [...getProducts,createProduct]
      await carrito.carritos.findByIdAndUpdate({idCart},{product: addProduct})
    }catch (e) {
      console.log('Error al insertar un producto en el carrito: ', e)
    }
  }

  async deleteProductInCartById(idCart, idProd){
    try{
      let getProducts = []
      getProducts = await carrito.carritos.find({_id: idCart},{_id:0, product:1})
      let band = false;
      let prodSearch = {}
      for (const prod of getProducts) {
        if (prod.id === idProd){
          band = true
          prodSearch = prod
        }
      }
      if (band){
        const indice = getProducts.indexOf(prodSearch)
        getProducts.splice(indice)
        await carrito.carritos.findByIdAndUpdate({idCart},{product: getProducts})
      }
    }catch(e){
      console.log('Error al eliminar un producto del carrito: ', e)
    }
  }
}

module.exports = ContenedorMongoDBCarrito