const fs = require('fs')

class ContenedorFileSystemCarrito {
  constructor(archivo) {
    this.archivo = archivo;
  }
  async saveCarrito() {
    try {
      let newContenido
      const contenido =  JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
      let idMayor = 0;
      contenido.forEach(carr => {
        if(carr.id > idMayor) idMayor = carr.id
      })

      const newCarrito = {
        "id":idMayor+1,
        "timestamp": Date.now(),
        "product": [],
      }
      let newCarritoFormat;
      if(contenido.length === 0) {
        newCarritoFormat = JSON.stringify(newCarrito)+']'
        newContenido = JSON.stringify(contenido).replace(']', newCarritoFormat);
      }else{
        newCarritoFormat = ']},'+JSON.stringify(newCarrito)+']'
        newContenido = JSON.stringify(contenido).replace(']}]', newCarritoFormat);
      }
      await fs.promises.writeFile(this.archivo, newContenido)
      return `ID del Carrito creado es: ${newCarrito.id}`
    } catch(error) {
      console.log('Error: ' + error)
    }
  }

  async deleteCarritoById(id){
    try{
      const contenido = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
      let band = false;
      let carritoSearched;
      contenido.forEach( carr => {
        if(carr.id === parseInt(id)){
          band = true;
          carritoSearched = carr;
        }
      })
      if(band){
        const indice = contenido.indexOf(carritoSearched)
        contenido.splice(indice,1)
        await fs.promises.writeFile(this.archivo, JSON.stringify(contenido))
      }
    }catch (e) {
      console.log('Error' + e)
    }
  }

  async getCarritoById(id) {
    try{
      let productos
      const contenido =  JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
      for (let carr of contenido) {
        if(carr.id === parseInt(id)) {
            productos = carr.product
            return productos
        }
      }
    }catch (e) {
      console.log('Error' + e)
    }
  }

  async saveProductToCarrito(idCarrito, product) {
    try {
      const contenido =  JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
      let newContenido;
      let newCarritoFormat;
      let carritoSearchedFormat;
      let carrito;
      let iguales = false
      let idMayor = 0;
      let prodSearched;
      for (let carr of contenido) {
        if(carr.id === parseInt(idCarrito)) {
          carrito = carr
          const productos = carr.product
          if(productos.length === 0) {
            const prodNuevo = {
              "id": product.id,
              "timestamp": Date.now(),
              "name": product.name,
              "description": product.description,
              "code": product.code,
              "thumbnail": product.thumbnail,
              "price": product.price,
              "stock": product.stock
            }
            const carritoConProductos = {
                "id": carr.id,
                "timestamp": carr.timestamp,
                "product": [prodNuevo],
              }
            newCarritoFormat = JSON.stringify(carritoConProductos)
            carritoSearchedFormat = JSON.stringify(carrito)
            newContenido = JSON.stringify(contenido).replace(carritoSearchedFormat, newCarritoFormat);
          }else{
              productos.forEach( prod => {
                if(prod.id > idMayor) idMayor = prod.id
                if(prod.id === parseInt(product.id)) {
                  iguales = true
                  prodSearched = prod
                }
              })
                if(iguales){
                  const prodActualizado = {
                    "id": prodSearched.id,
                    "timestamp": prodSearched.timestamp,
                    "name": product.name,
                    "description": product.description,
                    "code": product.code,
                    "thumbnail": product.thumbnail,
                    "price": product.price,
                    "stock": product.stock
                  }
                  const carritoConProductosActualizado = {
                    "id": carr.id,
                    "timestamp": carr.timestamp,
                    "product": [prodActualizado],
                  }
                  carritoSearchedFormat = JSON.stringify(carrito)
                  newCarritoFormat = JSON.stringify(carritoConProductosActualizado)
                  newContenido = JSON.stringify(contenido).replace(carritoSearchedFormat, newCarritoFormat);
                }
                else{
                    const prodNuevo = {
                      "id":idMayor+1,
                      "timestamp": Date.now(),
                      "name": product.name,
                      "description": product.description,
                      "code": product.code,
                      "thumbnail": product.thumbnail,
                      "price": product.price,
                      "stock": product.stock
                    }
                    const carritoConProductoNuevos = {
                      "id": carr.id,
                      "timestamp": carr.timestamp,
                      "product":  [...carr.product, prodNuevo]
                    }
                    carritoSearchedFormat = JSON.stringify(carrito)
                    newCarritoFormat = JSON.stringify(carritoConProductoNuevos)
                    newContenido = JSON.stringify(contenido).replace(carritoSearchedFormat, newCarritoFormat);
                    }
              }
          }
        }
      await fs.promises.writeFile(this.archivo, newContenido)
    } catch(error) {
      console.log('Error: ' + error)
    }
  }

  async deleteProductoTheCarritoById(idCarrito, idProducto){
    try{
      const contenido = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
      let band = false;
      let prodSearched;
      let products = []
      let carrito;
      let newCarritoFormat;
      let carritoSearchedFormat;
      let newContenido;

      contenido.forEach( carr => {
        if(carr.id === parseInt(idCarrito)){
            carrito = carr
            products = carr.product
            products.forEach(prod => {
                if (prod.id === idProducto){
                  band = true;
                  prodSearched = prod;
                }
            })
        }
      } )
      if(band){
        const indice = products.indexOf(prodSearched)
        products.splice(indice,1)
        const carritoConProductoEliminado = {
          "id": carrito.id,
          "timestamp": carrito.timestamp,
          "product":  carrito.product
        }
        carritoSearchedFormat = JSON.stringify(carrito)
        newCarritoFormat = JSON.stringify(carritoConProductoEliminado)
        newContenido = JSON.stringify(contenido).replace(carritoSearchedFormat, newCarritoFormat);
        await fs.promises.writeFile(this.archivo, newContenido)
      }
    }catch (e) {
      console.log('Error' + e)
    }
  }

}
module.exports = ContenedorFileSystemCarrito

