import * as carrito from "../models/carrito.js";
import mongoose from "mongoose"

export default class ContenedorMongoDBCarrito {
  constructor(connection) {
    this.connection = connection;
  }

  async createCart(){
    try {
      const cart = {
        timestamp: Date.now(),
        product: []
      }
      await carrito.carritos.create(cart)
    }catch (e){
      console.log('Error al crear un Carrito: ' ,e)
    }
  }

  async deleteCartById(id){
    try {
      await carrito.carritos.findByIdAndDelete({_id: id})
    }catch (e){
      console.log('Error al Eliminar un Carrito: ' + e)
    }
  }

  async findCartById(id){
    try {
      return await carrito.carritos.findOne({_id: id})
    }catch (e) {
      console.log('Error al Buscar un Carrito: ' + e)
    }
  }

  // async insertProductToCart(idCart, prod){
  //   try {
  //     const id = mongoose.Types.ObjectId();
  //     const getProducts = await carrito.carritos.find({_id: idCart},{_id:0, product:1})
  //     const createProduct = {
  //       _id: id,
  //       name: prod.name,
  //       description: prod.description,
  //       code: prod.code,
  //       thumbnail: prod.thumbnail,
  //       price: prod.price,
  //       stock: prod.stock,
  //     }
  //     getProducts.push(createProduct)
  //     console.log('addProduct ' + addProduct)
  //     await carrito.carritos.findByIdAndUpdate({_id: idCart},{product: getProducts})
  //   }catch (e) {
  //     console.log('Error al insertar un producto en el carrito: ', e)
  //   }
  // }

  async insertProductToCart(idCart, prod) {
    try {
      let cart = await carrito.carritos.findOne({ _id: idCart });
      if (cart) {
        const createProd = {
          productId: prod.productId,
          timestamp: Date.now(),
          name: prod.name,
          description: prod.description,
          code: prod.code,
          thumbnail: prod.thumbnail,
          price: prod.price,
          quantity:prod.quantity
        }
        let itemIndex = cart.product.findIndex(
          (item) => item.productId === prod.productId
        );
        console.log(itemIndex)
        if (itemIndex > -1) {
          cart.product[itemIndex].quantity = cart.product[itemIndex].quantity + prod.quantity;
        } else {
          cart.product.push(createProd);
        }
        await cart.save();
      }
      return cart;
    } catch (e) {
      console.log("Error al insertar un producto en el carrito: ", e);
    }
  }

  async deleteProductInCartById(idCart, idProd){
    try{
      let cart = await carrito.carritos.findOne({ _id: idCart });
      if(cart){
        let posi = cart.product.findIndex((item) => {item._id === mongoose.Types.ObjectId(idProd)});
        console.log('Posicion de producto: ' + posi)
        if (posi > -1) {
          cart.product.splice(posi);
        }
        await cart.save();
      }
    }catch(e){
      console.log('Error al eliminar un producto del carrito: ', e)
    }
  }
}
