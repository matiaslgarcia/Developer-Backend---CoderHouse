import * as carrito from "../models/carrito.js";
import mongoose from "mongoose"

export default class ContenedorMongoDBCarrito {
  constructor(connection) {
    this.connection = connection;
  }

  async createCart(){
    try {
      const idCar = await carrito.carritos.find({})
      if (idCar.length == 0) {
        const cart = {
          timestamp: Date.now(),
          product: []
        }
        const carritoId = await carrito.carritos.create(cart)
        return carritoId._id  
      } 
      return idCar[0]._id      
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
      let posicion
      let mensaje
      let getProducts = await carrito.carritos.find(
        {_id: idCart},
        {_id: 0, product:1})
      let cart = getProducts[0].product
      for (let i = 0; i < cart.length; i++) {
        if(cart[i]._id == idProd){
          posicion = i
        }
      }
      if(isNaN(posicion)){
        mensaje = "Error: Producto no econtrado en el carrito"
      } else {
        cart.splice(posicion,1)
        mensaje = "Producto eliminado del carrito"
      }
      await carrito.carritos.findByIdAndUpdate(
        {_id: idCart},
        {product: cart}
      )      
      return mensaje
    }catch(e){
      console.log('Error al eliminar un producto del carrito: ', e)
    }
  }
}
