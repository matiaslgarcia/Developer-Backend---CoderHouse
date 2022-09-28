import services from "../services/servicesCarrito.js";
import logger from "../utils/logger.js";
import fetch from "node-fetch";
import {puerto} from "../config.js";


const getCarritoConProductos = async (req,res) =>{
  const id = req.params.id
  const carritoWithProducts = await services.findCart(id)
  res.render('productosTest.ejs',
      {
        productos: carritoWithProducts.product,
        prodExists: await services.findCart(id).length !==0
      })
}

const deleteProductoDeCarrito = async (req,res) => {
  const idCarrito = req.params.id
  const idProducto = req.params.id_prod
  res.send({
    result: await services.deleteProductInCart(idCarrito,idProducto),
    idCarrito: idCarrito,
    idProducto: idProducto
  })
}


const deleteCarrito = async (req,res) =>{
  const id = req.params.id
  const carrito = await services.findCart(id)
  if(!carrito){
    res.send({error: `Producto con ID: ${id} No Encontrado`})
  } else {
    res.send({mensaje: `Carrito con ID: ${await services.deleteCart(id)} borrado `})
  }
}

const postProductoEnCarrito = async (req,res) =>{
  const id = req.params.id
  const producto = req.body
  await services.postProductToCart(id, producto)
  res.render('principalProductoAgregado.ejs', {id})
}

const postCarrito = async (req,res) =>{
  const carritoNew = await services.postCart()
  res.json(carritoNew)
}

export default {
  getCarritoConProductos,
  deleteProductoDeCarrito,
  deleteCarrito,
  postCarrito,
  postProductoEnCarrito
}
