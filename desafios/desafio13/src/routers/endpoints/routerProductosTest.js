import producto from "../../api/instanciaProductoTest.js"
import { Router } from "express"

const productoTest = new Router()

productoTest.get('/productos-test' ,async (req, res) => {
    try{
        res.render('productosTest.ejs',{productos: await producto.crearProductosParaFront(), 
                                        prodExists: await producto.crearProductosParaFront().length !==0})
    }catch (e) {
      res.send(e)
    }
})
  
export default productoTest