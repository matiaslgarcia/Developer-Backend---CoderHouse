import contenedorCarrito from "../instances/instanciaCarrito.js";

const postCart = async () => {
  return await contenedorCarrito.createCart()
}

const findCart = async (id) => {
  return await contenedorCarrito.findCartById(id)
}

const deleteCart = async (id) => {
  return await contenedorCarrito.deleteCartById(id)
}

const postProductToCart = async (id, product) => {
  return await contenedorCarrito.insertProductToCart(id, product)
}

const deleteProductInCart = async (idCarrito,idProducto) => {
  return await contenedorCarrito.deleteProductInCartById(idCarrito,idProducto)
}

export default {
  postCart,
  findCart,
  deleteCart,
  postProductToCart,
  deleteProductInCart
}
