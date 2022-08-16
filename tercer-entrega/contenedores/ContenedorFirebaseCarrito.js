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

  async getIdCarritos(){  
    const documentReferences = await admin.firestore()
        .collection(this.nameDocument)
        .listDocuments()
    return documentReferences.map(it => it.id)
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
      console.log(await this.getID())
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
    let carritos
    let posicion
    let createProduct
    try {
      let clave = await this.getIdCarritos() 
      control = clave.includes(String(idCart)) 

      if (control){
        carritos = await this.getIdCarritos();
        posicion = carritos.findIndex(e => e === String(idCart))

        const doc = this.getQuery().doc(`${idCart}`)
        const querySnapshot = await this.getQuery().get()
        const response = querySnapshot.docs.map( prod => ({
        product: prod.data().product,
        timestamp: prod.data().timestamp,
        }))
        let contenido = response[posicion].product.length
        if(contenido === 0) {
          createProduct = {
            id: 1,
            name: prod.name,
            description: prod.description,
            code: prod.code,
            thumbnail: prod.thumbnail,
            price: prod.price,
            quantity: prod. quantity,
          }
        } else {
          idProd = response[posicion].product[(response[posicion].product.length)-1].id
          createProduct = {
            id: parseInt(idProd)+1,
            name: prod.name,
            description: prod.description,
            code: prod.code,
            thumbnail: prod.thumbnail,
            price: prod.price,
            quantity: prod.quantity,
          }
        }
        newProduct = response[posicion].product
        newProduct.push(createProduct)
        await doc.update({
          timestamp: new Date(Date.now()).toLocaleString(),
          product: newProduct,
        })
        return 'Producto insertado correctamente en el carrito'
      } else {
        return 'Error: El carrito no existe'
      }
    }catch (e) {
      console.log('Error al insertar un producto en el carrito: ', e)
    }
  }

  async deleteProductInCartById(idCart, idProd){
    await this.connectionDb()
    let newProduct = []
    let control
    let productos
    let posicionCarrito
    let posicion
    let carritos
    let contenido
    try {
      let clave = await this.getIdCarritos() 
      control = clave.includes(String(idCart)) 
      const doc = this.getQuery().doc(`${idCart}`)
      if(control){
        carritos = await this.getIdCarritos();
        posicion = carritos.findIndex(e => e === String(idCart))  
        const querySnapshot = await this.getQuery().get()
        const response = querySnapshot.docs.map( prod => ({
          product: prod.data().product,
          timestamp: prod.data().timestamp,
        }))
        contenido = response[posicion].product.length
        if (contenido !== 0){
          for (let i = 0; i < contenido; i++) {
            productos = response[posicion].product[i]
            if(idProd === productos.id){
              posicionCarrito = i
            }          
          } 
        newProduct = response[posicion].product
        newProduct.splice(posicionCarrito,1)
        } 
        await doc.update({
          timestamp: new Date(Date.now()).toLocaleString(),
          product: newProduct,
        })    
        return 'Producto eliminado correctamente del carrito'
      } else {
        return 'Error: El carrito no existe'
      }
    }catch(e){
      console.log('Error al eliminar un producto del carrito: ', e)
    }
  }
}

