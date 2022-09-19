import services from "../services/servicesProductos.js";

let admin = false

const getProductos = async (req,res) =>{
  const id = req.params.id
  if(!id){
    const productos = await services.getProducts()
    res.render('principalContainerProducts.ejs', {productos, admin})
   /* res.send({productos: await services.getProducts()})*/
  } else {
    const prod = await services.getProductsById(id)
    res.render('principalContainerProductById.ejs', {prod})
  }
}

const postProducto = async (req,res) =>{
  const producto = req.body
  if(!admin){
    res.send(
      {
        mensaje: 'Producto agregado Correctamente',
        producto:  await services.postProduct(producto)
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
  const producto = {
    "timestamp": Date.now(),
    "name": name,
    "description": description,
    "code": code,
    "thumbnail": thumbnail,
    "price": price,
    "stock": stock
  }
  if(!admin){
    res.send({
      result: 'Producto Actualizado',
      productoActualizado: await services.updateProduct(id, producto)
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
    res.send({
      result: 'Delete ok',
      id: await services.deleteProduct(id)
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
