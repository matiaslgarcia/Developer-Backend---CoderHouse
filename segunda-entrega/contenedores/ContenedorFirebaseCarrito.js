import admin from "firebase-admin"

export default class ContenedorFirebaseCarrito{
  constructor(nameDocument) {
    this.nameDocument = nameDocument
  }

  async connectionDb(){
    return admin.firestore().collection(this.nameDocument)
  }

  getQuery(){
    return admin.firestore().collection(this.nameDocument)
  }

  async getID(){  
    const documentReferences = await admin.firestore()
        .collection(this.nameDocument)
        .listDocuments()
    const documentIds = documentReferences.map(it => it.id)
    return documentIds[documentIds.length - 1]
  }

  async createCart(){
    await this.connectionDb()
    try {
      let id = await this.getID();
      let doc = await this.getQuery().doc((parseInt(id) + 1).toString())
      const cart = {
        timestamp: new Date(Date.now()).toLocaleString(),
        product: [],
      }
      await doc.create(cart)
    }catch (e){
      console.log('Error al crear un Carrito: ' ,e)
    }
  }

  async deleteCartById(id){
    await this.connectionDb()
    try {
      const doc = this.getQuery().doc(`${id}`)
      await doc.delete()
    }catch (e){
      console.log('Error al Eliminar un Carrito: ' + e)
    }
  }

  async findCartById(id){
    await this.connectionDb()
    try {
      const doc = this.getQuery().doc(`${id}`)
      const cart = await doc.get()
      return cart.data()
    }catch (e) {
      console.log('Error al Buscar un Carrito: ' + e)
    }
  }

  async insertProductToCart(idCart, prod){
    await this.connectionDb()
    let idProd
    let newProduct = []
    let control
    try {
      const doc = this.getQuery().doc(`${idCart}`)
      const querySnapshot = await this.getQuery().get()
      const response = querySnapshot.docs.map( prod => ({
        product: prod.data().product,
        timestamp: prod.data().timestamp,
      }))
      control = response[idCart-1].product.length 
      if (control === 0){
        const createProduct = {
          id: 1,
          name: prod.name,
          description: prod.description,
          code: prod.code,
          thumbnail: prod.thumbnail,
          price: prod.price,
          quantity: prod. quantity,
        }
        newProduct = response[idCart-1].product
        newProduct.push(createProduct)
      }else{
        idProd = response[idCart-1].product[(response[idCart-1].product.length)-1].id
        const createProduct = {
          id: parseInt(idProd)+1,
          name: prod.name,
          description: prod.description,
          code: prod.code,
          thumbnail: prod.thumbnail,
          price: prod.price,
          quantity: prod.quantity,
        }
        newProduct = response[idCart-1].product
        newProduct.push(createProduct)
      }
      await doc.update({
        timestamp: new Date(Date.now()).toLocaleString(),
        product: newProduct,
      })
    }catch (e) {
      console.log('Error al insertar un producto en el carrito: ', e)
    }
  }

  async deleteProductInCartById(idCart, idProd){
    await this.connectionDb()
    let newProduct = []
    let control
    let productos
    let posicion
    try {
      const doc = this.getQuery().doc(`${idCart}`)
      const querySnapshot = await this.getQuery().get()
      const response = querySnapshot.docs.map( prod => ({
        product: prod.data().product,
        timestamp: prod.data().timestamp,
      }))
      control = response[idCart-1].product.length
      if (control !== 0){
        for (let i = 0; i < control; i++) {
          productos = response[idCart-1].product[i]
          if(idProd === productos.id){
            posicion = i
          }          
        }
        newProduct = response[idCart-1].product
        newProduct.splice(posicion,1)
      }
      await doc.update({
        timestamp: new Date(Date.now()).toLocaleString(),
        product: newProduct,
      })
    }catch(e){
      console.log('Error al eliminar un producto del carrito: ', e)
    }
  }
}

