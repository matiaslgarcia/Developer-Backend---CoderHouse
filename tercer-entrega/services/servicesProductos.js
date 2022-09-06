import contenedorProducto from "../instances/instanciasProducto.js";

const getProducts = async () =>{
  return await contenedorProducto.findProducts()
}

const getProductsById = async (id) =>{
  return await contenedorProducto.findProductById(id)
}

const postProduct = async (product) =>{
 return await contenedorProducto.createProduct(product)
}

const updateProduct = async (id, producto) =>{
  return await contenedorProducto.updateProductById(id, producto)
}

const deleteProduct = async (id) =>{
  return await contenedorProducto.deleteProductById(id)
}

export default {
  getProducts,
  getProductsById,
  postProduct,
  updateProduct,
  deleteProduct,
}
