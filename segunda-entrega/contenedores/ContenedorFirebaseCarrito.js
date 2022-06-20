import admin from "firebase-admin"

export default class ContenedorFirebaseCarrito{
  constructor(connection, nameDocument) {
    this.connection = connection;
    this.nameDocument = nameDocument
  }

  async createCart(){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      let id = 1;
      let doc = await query.doc(id.toString())
      const cart = {
        timestamp: Date.now(),
        product: [],
      }
      await doc.create(cart)
      id++
    }catch (e){
      console.log('Error al crear un Carrito: ' ,e)
    }
  }

  async deleteCartById(id){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      const doc = query.doc(`${id}`)
      await doc.delete()
    }catch (e){
      console.log('Error al Eliminar un Carrito: ' + e)
    }
  }

  async findCartById(id){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      const doc = query.doc(`${id}`)
      const cart = await doc.get()
      return cart.data()
    }catch (e) {
      console.log('Error al Buscar un Carrito: ' + e)
    }
  }

  async insertProductToCart(idCart, prod){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try {
      let getProducts = []
      const querySnapshot =  query.doc(`${idCart}`)
      const cart = await querySnapshot.get()
      getProducts = cart.data().product
      let id = 1;
      const createProduct = {
        id: id,
        name: prod.name,
        description: prod.description,
        code: prod.code,
        thumbnail: prod.thumbnail,
        price: prod.price,
        stock: prod.stock,
      }
      const addProduct = [...getProducts,createProduct]
      await querySnapshot.update({
        product: addProduct
      })
      id++
    }catch (e) {
      console.log('Error al insertar un producto en el carrito: ', e)
    }
  }

  async deleteProductInCartById(idCart, idProd){
    const db = admin.firestore()
    const query = db.collection(this.nameDocument)
    try{
      let getProducts = []
      let band = false;
      let prodSearch = {}
      const doc = query.doc(`${idCart}`)
      const cart = await doc.get()
      getProducts = cart.data().product
      getProducts.forEach(prod => {
        if (prod.id === idProd){
          band = true
          prodSearch = prod
        }
      })
      if (band){
        const indice = getProducts.indexOf(prodSearch)
        getProducts.splice(indice)
        await doc.update({
          product: getProducts
        })
      }
    }catch(e){
      console.log('Error al eliminar un producto del carrito: ', e)
    }
  }
}

