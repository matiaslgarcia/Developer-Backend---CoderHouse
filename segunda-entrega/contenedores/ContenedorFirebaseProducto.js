import admin from "firebase-admin"

export default class ContenedorFirebaseProducto {
  constructor(connection, nameDocument) {
    this.connection = connection;
    this.nameDocument = nameDocument
  }

  async createProduct(prod){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      let id = 1;
      let doc = await query.doc(id.toString())
      const product = {
        timestamp: Date.now(),
        name: prod.name,
        description: prod.description,
        code: prod.code,
        thumbnail: prod.thumbnail,
        price: prod.price,
        stock: prod.stock,
      }
      await doc.create(product)
      id++
    }catch (e) {
      console.log('Error al Crear un Producto: ' + e)
    }
  }

  async findProductById(id){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      const doc = query.doc(`${id}`)
      const product = await doc.get()
      return product.data()

    }catch (e) {
      console.log('Error al Buscar un Producto: ' + e)
    }
  }

  async findProducts(){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      const querySnapshot = await query.get()
      querySnapshot.docs.map( prod => {return prod})
    }catch (e) {
      console.log('Error al Buscar un Producto: ' + e)
    }
  }

  async updateProductById(id, prod){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      const doc = query.doc(`${id}`)
      await doc.update({
        name: prod.name,
        description: prod.description,
        code: prod.code,
        thumbnail: prod.thumbnail,
        price: prod.price,
        stock: prod.stock,
      })
    }catch (e) {
      console.log('Error al Actualizar un Producto: ' + e)
    }
  }

  async deleteProductById(id){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      const doc = query.doc(`${id}`)
      await doc.delete()
    }catch (e){
      console.log('Error al Eliminar un Producto: ' + e)
    }
  }
}

