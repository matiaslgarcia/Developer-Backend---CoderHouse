import services from "../services/servicesProductos.js";
import logger from "../utils/logger.js";

let admin = false

const getProductos = async (req,res) =>{
  const id = req.params.id
  if(!id){
    const productos = await services.getProducts()
    res.render('principalContainerProducts.ejs', {productos, admin})
  } else {
    const prod = await services.getProductsById(id)
    res.render('principalContainerProductById.ejs', {prod, prodAct: prod.id, admin})
  }
}

const postProducto = async (req,res) =>{
  const productoNuevo ={
    name:  req.body.name,
    description: req.body.description,
    code: req.body.code,
    thumbnail: req.body.thumbnail,
    price: req.body.price,
    stock: req.body.stock
  }
  if(!admin){
    await services.postProduct(productoNuevo)
    res.redirect('/api/productos/')
    res.send(
      {
        mensaje: 'Producto agregado Correctamente',
      }
    )
  }else{
    res.send(
      { error : -1,
        descripcion: `Ruta /`,
        metodo: 'Post no authorized' }
    )
  }
}

const putProducto = async (req,res) =>{
  const id = req.params.id
  const {name, description,code, thumbnail, price, stock} = req.body
  const productoActualizado = {
    "timestamp": Date.now(),
    "name": name,
    "description": description,
    "code": code,
    "thumbnail": thumbnail,
    "price": price,
    "stock": stock
  }
  if(!admin){
    await services.updateProduct(id, productoActualizado)
    res.redirect('/api/productos/')
    res.send({
      result: 'Producto Actualizado',
    })
  }else{
    res.send(
      {
        error : -1,
        descripcion: `Ruta /${id}`,
        método: 'Put no authorized' }
    )
  }
}
const deleteProducto = async (req,res) =>{
  const id = req.params.id
  if(!admin){
     await services.deleteProduct(id)
    res.send({
      result: 'Delete ok',
    })
  }else{
    res.send(
      {
        error : -1,
        descripcion: `Ruta /${id}`,
        método: 'Delete no authorized' }
    )
  }
}

export default {
  getProductos,
  postProducto,
  putProducto,
  deleteProducto
}
