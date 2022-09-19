import services from "../services/servicesCarrito.js";
import logger from "../utils/logger.js";

const getCarritoConProductos = async (req,res) =>{
  const id = req.params.id
  const carrito = await services.findCart(id)
  services.findCart.then(p => {
    if(!carrito){
      res.send({error: `Carrito con ID: ${id} No Encontrado`})
    } else {
      console.log(p)
      res.send(carrito)
    }
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
  res.send(
    {
      mensaje: 'Producto agregado Correctamente al carrito',
      producto: producto,
      idCarrito: id
    }
  )
}

const postCarrito = async (req,res) =>{
  await services.postCart()
  res.redirect('/api/productos/')
}

export default {
  getCarritoConProductos,
  deleteProductoDeCarrito,
  deleteCarrito,
  postCarrito,
  postProductoEnCarrito
}
