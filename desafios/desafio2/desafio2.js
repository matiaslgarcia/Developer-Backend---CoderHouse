const fs = require('fs')

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }
    async save(producto) {
        try {
            const contenido =  JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
            let idMayor = 0;
            contenido.forEach(prod => {
                if(prod.id > idMayor) idMayor = prod.id
            })

            const newProduct = {
                "id":idMayor+1,
                "title":producto.title,
                "price":producto.price,
                "thumbnail": producto.thumbnail
            }
            let newProductFormat;
            if(contenido.length === 0) {
                newProductFormat = JSON.stringify(newProduct)+']'
            }else{
                newProductFormat = ','+JSON.stringify(newProduct)+']'
            }
            const newContenido = JSON.stringify(contenido).replace(']', newProductFormat);
            await fs.promises.writeFile(this.archivo, newContenido)
            return `ID de producto asignado fue: ${newProduct.id}`
        } catch(error) {
            console.log('Error: ' + error)
        }
    }

    async getById(id) {
        try{
           const contenido =  JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
            for (let prod of contenido) {
                if(prod.id === id) return prod
            }
        }catch (e) {
            console.log('Error' + e)
        }
        return null
    }

    async getAll(){
        try{
            return JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
        }catch (e) {
            console.log('Error' + e)
        }
    }

    async deleteById(id){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
            let band = false;
            let prodSearched;
            contenido.forEach( prod => {
                if(prod.id === id){
                    band = true;
                    prodSearched = prod;
                }
            })
            if(band){
                const indice = contenido.indexOf(prodSearched)
                contenido.splice(indice,1)
                await fs.promises.writeFile(this.archivo, JSON.stringify(contenido))
            }
        }catch (e) {
            console.log('Error' + e)
        }
    }

    async deleteAll(){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
            contenido.splice(0, contenido.length)
            await fs.promises.writeFile(this.archivo, JSON.stringify(contenido))
        }catch (e) {
            console.log('Error' + e)
        }
    }
    async putById(id, producto){
        try {
            const contenido =  JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))
            let prodSearched;
            for (let prod of contenido) {
                if(prod.id === id) prodSearched = prod
            }

            const newProduct = {
                "id": producto.id,
                "title":producto.title,
                "price":producto.price,
                "thumbnail": producto.thumbnail
            }
            const newProductString = JSON.stringify(newProduct)
            const prodSearchedString = JSON.stringify(prodSearched)
            const newContenido = JSON.stringify(contenido).replace(prodSearchedString, newProductString);
            await fs.promises.writeFile(this.archivo, newContenido)
        }catch (e){
            console.log('Error' + e)
        }
    }
}

const contenedor = new Contenedor('./productos.txt')
    // contenedor.putById(1, {
    //      title: 'Mayonesa',
    //      price: 120.00,
    //      thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/200/562/products/natura-mayo1-d9188ccfbd84c656c116014073079977-1024-1024.png',
    //      id: 1,
    // }).then(r =>{
    //     console.log(r)
    // })
// contenedor.save(
//     {
//         title: 'Mayonesa',
//         price: 120.00,
//         thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/200/562/products/natura-mayo1-d9188ccfbd84c656c116014073079977-1024-1024.png'
//     }
// ).then(prod => console.log(prod))
// contenedor.getById(40).then(res => console.log(res))
contenedor.getAll().then(res => console.log(res))
// contenedor.deleteById(42).then(res => res)
// contenedor.deleteAll().then(r => r)



