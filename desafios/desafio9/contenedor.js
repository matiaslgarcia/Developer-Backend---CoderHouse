class Contenedor {

    constructor(configuracion, tableName) {
        this.knex = configuracion;
        this.tableName = tableName;
    }

    async insertProduct(producto) {
        try {
            const newProduct = {
                    title: producto.title,
                    price: producto.price, 
                    thumbnail: producto.thumbnail
                }
            this.knex(this.tableName).insert(newProduct)
                .then(() => console.log('Se inserto el nuevo productos'))
                .catch((err) => { throw err})
        } catch(error) {
            console.log('Error: ' + error)
        }
    }

    async getProductById(idProduct) {
        return this.knex(this.tableName).select('*')
                    .where({id: idProduct})
    }

    async getAllProducts(){
        try{
            return this.knex(this.tableName).select('*')
        }catch (e) {
            throw e
        }
    }

    async updateProductById(id, producto){
        try {
            //Ver condicion a actualizar
            this.knex.from(this.tableName)
                .where('condicion',cond)
                .update(newProduct)
                .then(() => console.log('Se actualizo el nuevo productos'))
                .catch((err) => { console.log(err); throw err})
        }catch (e){
            throw e
        }
    }

    async deleteById(id){
        try{
            return this.knex.from(this.tableName)
                    .where('id',id)
                    .del()
        }catch (e) {
            throw e
        }
    }

    async deleteAll(){
        try{
            return this.knex
              .from(this.tableName)
              .del()
        }catch (e) {
            throw e
        }
    }
}
module.exports = Contenedor

