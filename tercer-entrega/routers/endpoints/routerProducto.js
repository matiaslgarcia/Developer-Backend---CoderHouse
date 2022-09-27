import { Router } from "express"
import controller from "../../controllers/controllerProductos.js";

const generarProductos = new Router()

generarProductos.get('/:id?', controller.getProductos)
generarProductos.post('/', controller.postProducto)
generarProductos.post('/:id', controller.putProducto)
generarProductos.delete('/:id', controller.deleteProducto)

export default generarProductos
