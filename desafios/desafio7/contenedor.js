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
                .then(() => console.log('Se inserto el nuevo producto'))
                .catch((err) => { console.log(err); throw err})
                .finally(() => {
                    this.knex.destroy()
                })
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
            console.log('Error' + e)
        }
    }

    async updateProductById(id, producto){
        try {
            //Ver condicion a actualizar
            this.knex.from(this.tableName)
                .where('condicion',cond)
                .update(newProduct)
                .then(() => console.log('Se actualizo el nuevo producto'))
                .catch((err) => { console.log(err); throw err})
        }catch (e){
            console.log('Error' + e)
        }
    }

    async deleteById(id){
        try{
            return this.knex.from(this.tableName)
                            .where('id',id)
                            .del()
        }catch (e) {
            console.log('Error' + e)
        }
    }

    async deleteAll(){
        try{
            return this.knex.from(this.tableName)
                            .del()
        }catch (e) {
            console.log('Error' + e)
        }
    }
}
module.exports = Contenedor

