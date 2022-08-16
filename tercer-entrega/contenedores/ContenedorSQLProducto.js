class ContenedorSQLProducto {

    constructor(configuracion, tableName) {
      this.knex = configuracion;
      this.tableName = tableName;
    }
  
    async createProduct(prod){
        try {
          const newProduct = {
            timestamp: Date.now(),
            name: prod.name,
            description: prod.description,
            code: prod.code,
            thumbnail: prod.thumbnail,
            price: prod.price,
            stock: prod.stock,
        }
        return this.knex(this.tableName).insert(newProduct) 

        } catch (e) {
          console.log('Error al Crear un Producto: ' + e)
        }
    }
    
    async findProductById(idProduct){
        try {
            return this.knex(this.tableName).select('*')
                       .where({id: idProduct})
        } catch (e) {
            console.log('Error al Buscar un Producto: ' + e)
        }
    }

    async findProducts(){
        try {
        return this.knex(this.tableName).select('*')
        } catch (e) {
            console.log('Error al Buscar un Producto: ' + e)
        }
    }
    
    async updateProductById(idProduct, prod){
        try {
            const newProduct = {
                timestamp: Date.now(),
                name: prod.name,
                description: prod.description,
                code: prod.code,
                thumbnail: prod.thumbnail,
                price: prod.price,
                stock: prod.stock,
            }
            await this.knex.from(this.tableName)
                           .where({'id': idProduct})
                           .update(newProduct)
        } catch (e) {
            console.log('Error al Actualizar un Producto: ' + e)
        }
    }
    
    async deleteProductById(idProduct){
        try {
            return this.knex.from(this.tableName)
            .where({'id':idProduct})
            .del()
        } catch (e){
            console.log('Error al Eliminar un Producto: ' + e)
        }
    }
}