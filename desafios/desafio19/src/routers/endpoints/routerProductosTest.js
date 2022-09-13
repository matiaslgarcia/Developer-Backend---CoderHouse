
import { Router } from "express"
import controller from "../../controllers/controllers.js";

const productoTest = new Router()

productoTest.get('/productos-test' , controller.productTest)

export default productoTest
