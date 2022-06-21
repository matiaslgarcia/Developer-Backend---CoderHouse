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
    console.log(idCart, "idCart");
    console.log(prod, "prod");
    try {
      let cart = await carrito.carritos.findOne({ _id: idCart });
      console.log(cart, "cart");
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
        console.log(itemIndex, "itemIndex");
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
      
      let getProducts = await carrito.carritos.find({_id: idCart},{_id:0, product:1})
      console.log('Productos almacenados en el carrito: ' + Object.values(getProducts[0]))
      let itemIndex = getProducts.findIndex(        
        (item) => {
          console.log(item._id)
          console.log(mongoose.Types.ObjectId(idProd))
          item._id === mongoose.Types.ObjectId(idProd)}
      );
      console.log(itemIndex)
     
      // let indice = 0
      // for (let i = 0; i < getProducts.length; i++) {
      //   const element = getProducts[i];
        
      //   console.log('Id del array: ' + getProducts[i])
      //   console.log('Id del parametro: ' + idProd)
      //   if (id == idProd) {
      //     indice = i
      //   }
      //   console.log(element)
      // }
      // console.log(indice)
      
      // let band = false;
      // let prodSearch = {}
      // for (const prod of getProducts) {
      //   if (prod.productId === idProd){
      //     band = true
      //     prodSearch = prod
      //   }
      // }
      // if (band){
      //   const indice = getProducts.indexOf(prodSearch)
      //   getProducts.splice(indice)
      //   await getProducts.save()
      // }
      // const id = mongoose.Types.ObjectId(idProd);
      // console.log("id convertido " + id)
      
      // console.log("id pasado por parametro " + idProd)
      // let cart = await carrito.carritos.findOne({ _id: idCart });
      // let pos = cart.product.findIndex((item) => {
      // console.log('Item ' + item)
      // item.productId === idProd});
      // console.log('Posicion de producto: ' + pos)
      
      // if (cart) {
      //   //
      //   let itemIndex = cart.product.findIndex(
      //     (item) => item.productId === idProd
      //   );
      //   console.log(itemIndex, "itemIndex");
      //   if (itemIndex > -1) {
      //     cart.product.splice(itemIndex);
      //     //cart.product[itemIndex].quantity += 1;
      //   }
      //  await cart.save();
      
    }catch(e){
      console.log('Error al eliminar un producto del carrito: ', e)
    }
  }
}
