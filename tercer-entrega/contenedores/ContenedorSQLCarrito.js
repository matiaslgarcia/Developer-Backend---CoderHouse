class ContenedorSQLCarrito {

    constructor(configuracion, tableName) {
      this.knex = configuracion;
      this.tableName = tableName;
    }
  
    async createCart(carr){
        try {
            const newCart = {
                timestamp: Date.now(),
                cantProducts: carr.cantProducts,
                idProducto: carr.idProducto,
            }
            return this.knex(this.tableName).insert(newCart) 
        }catch (e){
            console.log('Error al crear un Carrito: ' ,e)
        }
      }
    
      async deleteCartById(idCart){
        try {
            return this.knex.from(this.tableName)
                            .where({'id':idCart})
                            .del()
        }catch (e){
            console.log('Error al Eliminar un Carrito: ' + e)
        }
      }
    
      async findCartById(idCart){
        try {
            return this.knex(this.tableName).select('*')
                       .where({id: idCart})
        }catch (e) {
            console.log('Error al Buscar un Carrito: ' + e)
        }
      }
    
      async insertProductToCart(idCart, prod){
        
        try {
            const newCart = {
                timestamp: Date.now(),
                producto: prod.id,
                cantProducts: prod.cantProducts,
            }
            await this.knex(this.tableName).insert(newCart) 
        } catch (e) {
            console.log('Error al insertar un producto en el carrito: ', e)
        }
      }
    
      async deleteProductInCartById(idCart, idProd){
        try{
          let getProducts = []
          getProducts = await carrito.carritos.find({_id: idCart},{_id:0, product:1})
          let band = false;
          let prodSearch = {}
          for (const prod of getProducts) {
            if (prod.id === idProd){
              band = true
              prodSearch = prod
            }
          }
          if (band){
            const indice = getProducts.indexOf(prodSearch)
            getProducts.splice(indice)
            await carrito.carritos.findByIdAndUpdate({idCart},{product: getProducts})
          }
        }catch(e){
          console.log('Error al eliminar un producto del carrito: ', e)
        }
      }
  }