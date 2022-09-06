import { Router } from "express"
import controller from "../../controllers/controllerCarrito.js";

const generarCarritos = new Router()

generarCarritos.get('/:id/productos', controller.getCarritoConProductos)
generarCarritos.post('/', controller.postCarrito)
generarCarritos.delete('/:id', controller.deleteCarrito)
generarCarritos.post('/:id/productos', controller.postProductoEnCarrito)
generarCarritos.delete('/:id/productos/:id_prod', controller.deleteProductoDeCarrito)

export default generarCarritos
