import admin from "firebase-admin"

export default class ContenedorFirebaseProducto {
  constructor(nameDocument) {
    this.nameDocument = nameDocument
  }
  async connectionDb(){
    return admin.firestore().collection(this.nameDocument)
  }

  async getID(){  
    const documentReferences = await admin.firestore()
        .collection(this.nameDocument)
        .listDocuments()
    const documentIds = documentReferences.map(it => it.id)
    return documentIds[documentIds.length - 1]
  }

  getQuery(){
    return admin.firestore().collection(this.nameDocument)
  }
  generateProduct(prod){
    let product;
    return product = {
        timestamp: new Date(Date.now()).toLocaleString(),
        name: prod.name,
        description: prod.description,
        code: prod.code,
        thumbnail: prod.thumbnail,
        price: prod.price,
        stock: prod.stock,
      }
  }
  async createProduct(product){
    await this.connectionDb()
    try {
      let id = await this.getID()
      let doc
      if (isNaN(id)){
        doc = await this.getQuery().doc((1).toString())
      } else {
        doc = await this.getQuery().doc((parseInt(id) + 1).toString())
      }
      await doc.create(this.generateProduct(product))
    }catch (e) {
      console.log('Error al Crear un Producto: ' + e)
    }
  }

  async findProductById(id){
    await this.connectionDb()
    try {
      const doc = this.getQuery().doc(`${id}`)
      const product = await doc.get()
      return product.data()
    }catch (e) {
      console.log('Error al Buscar un Producto: ' + e)
    }
  }

  async findProducts(){
    await this.connectionDb()
    try {
      let id = await this.getID()
      const querySnapshot = await this.getQuery().get()
      const response = querySnapshot.docs.map( prod => ({
        id: prod.data().id,
        timestamp: prod.data().timestamp,
        name: prod.data().name,
        description: prod.data().description,
        code: prod.data().code,
        thumbnail: prod.data().thumbnail,
        price: prod.data().price,
        stock: prod.data().stock,
      }))
      return response
    }catch (e) {
      console.log('Error al Buscar un Producto: ' + e)
    }
  }

  async updateProductById(id, prod){
    await this.connectionDb()
    try {
      const doc = this.getQuery().doc(`${id}`)
      await doc.update(this.generateProduct(prod))
    }catch (e) {
      console.log('Error al Actualizar un Producto: ' + e)
    }
  }

  async deleteProductById(id){
    await this.connectionDb()
    try {
      const doc = this.getQuery().doc(`${id}`)
      await doc.delete()
    }catch (e){
      console.log('Error al Eliminar un Producto: ' + e)
    }
  }
}

