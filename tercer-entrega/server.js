//LIBRERIAS
import express from 'express'
import mongoose from "mongoose"
import ContenedorMongoDBProducto from './contenedores/ContenedorMongoDBProducto.js'
import ContenedorMongoDBCarrito from './contenedores/ContenedorMongoDBCarrito.js'

//import admin from "firebase-admin"
// import Producto from './contenedores/ContenedorFirebaseProducto.js'
// import Carrito from './contenedores/ContenedorFirebaseCarrito.js'
// import serviceAccount from './db/coderhouse-backend-82fda-firebase-adminsdk-g7713-a84f915b79.json' assert { type: 'json' }


const URL = "mongodb+srv://coderhouse:coderhouse@cluster0.utluy.mongodb.net/?retryWrites=true&w=majority"
let conexion = await mongoose.connect(URL);

//DEPENDENCIAS
const app = express()
const routerProducto = express.Router()
const routerCarrito = express.Router()

app.use(express.static('public'))
routerProducto.use(express.json())
routerCarrito.use(express.json())

routerProducto.use(express.urlencoded({extended:true}))
routerCarrito.use(express.urlencoded({extended:true}))

app.use('/api/productos', routerProducto)
app.use('/api/carrito', routerCarrito)
const contenedorProducto = new ContenedorMongoDBProducto(conexion)
const contenedorCarrito = new ContenedorMongoDBCarrito(conexion) 

console.log('Conexion a la base de datos correcta')

//ENDPOINTS
let admin = false

//PRODUCTOS
routerProducto.get('/:id?', async (req,res) =>{
  const id = req.params.id
  if(!id){
    contenedorProducto.findProducts().then(p => {
        res.send({productos: p})
    })
  }else{
        contenedorProducto.findProductById(id).then( prod =>{
          res.send({producto: prod})
        })
    }
})

routerProducto.post('/', async (req,res) =>{
  const producto = req.body
  if(!admin){
    await contenedorProducto.createProduct(producto)
    res.send(
      {
        mensaje: 'Producto agregado Correctamente',
        producto: producto
      }
    )
  }else{
    res.send(
      {
        error : -1,
        descripcion: `Ruta /`,
        método: 'Post no authorized' }

    )
  }
})

routerProducto.put('/:id', async (req,res) =>{
  const id = req.params.id
  const {name, description,code, thumbnail, price, stock} = req.body
  const producto = {
    "timestamp": Date.now(),
    "name": name,
    "description": description,
    "code": code,
    "thumbnail": thumbnail,
    "price": price,
    "stock": stock
  }
  if(!admin){
    await contenedorProducto.updateProductById(id, producto)
    res.send({
      result: 'ok',
      productoActualizado: producto
    })
  }else{
    res.send(
      {
        error : -1,
        descripcion: `Ruta /${id}`,
        método: 'Put no authorized' }

    )
  }

})

routerProducto.delete('/:id', async (req,res) =>{
  const id = req.params.id
  if(!admin){
    await contenedorProducto.deleteProductById(id)
    res.send({
      result: 'Delete ok',
      id: id,
    })
  }else{
    res.send(
      {
        error : -1,
        descripcion: `Ruta /${id}`,
        método: 'Delete no authorized' }

    )
  }
})
routerProducto.all('*', (req, res) =>{
  res.send(
    {
      error: -2,
      description: `Ruta No valida`,
      method: `Method No soportado`,
    }
  );
})

//CARRITO

routerCarrito.post('/', async (req,res) =>{
  await contenedorCarrito.createCart()
  res.send({mensaje: 'Carrito creado correctamente'})
})

routerCarrito.delete('/:id', async (req,res) => {
  const id = req.params.id
  const carrito = await contenedorCarrito.findCartById(id)
    console.log(carrito)
    if(!carrito){
      res.send({error: `Producto con ID: ${id} No Encontrado`})
    } else {
      await contenedorCarrito.deleteCartById(id)
      res.send({mensaje: `Carrito con ID: ${id} borrado `})
    }
})

routerCarrito.get('/:id/productos', async (req,res) =>{
  const id = req.params.id
  const carrito = await contenedorCarrito.findCartById(id)
  contenedorCarrito.findCartById(id).then(p => {
    if(!carrito){
      res.send({error: `Carrito con ID: ${id} No Encontrado`})
    } else {
      console.log(p)
      res.send(p)
    }
  })
})

routerCarrito.post('/:id/productos', async (req,res) =>{
  const id = req.params.id
  const producto = req.body
  await contenedorCarrito.insertProductToCart(id, producto)
  res.send(
    {
      mensaje: 'Producto agregado Correctamente al carrito',
      producto: producto,
      idCarrito: id
    }
  )
})

routerCarrito.delete('/:id/productos/:id_prod', async (req,res) =>{
  const idCarrito = req.params.id
  const idProducto = req.params.id_prod
  res.send({
    result: await contenedorCarrito.deleteProductInCartById(idCarrito,idProducto),
    idCarrito: idCarrito,
    idProducto: idProducto
  })
})

routerCarrito.all('*', (req, res) =>{
  res.send(
    {
      error: -2,
      description: `Ruta No valida`,
      method: `Method No soportado`,
    }
  );
})

//SERVER
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})

// -------------------- FIREBASE -----------------------------------------

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// console.log('Firebase Conectado correctamente')

// //DEPENDENCIAS
// const app = express()
// const routerProducto = express.Router()
// const routerCarrito = express.Router()

// app.use(express.static('public'))
// routerProducto.use(express.json())
// routerCarrito.use(express.json())

// routerProducto.use(express.urlencoded({extended:true}))
// routerCarrito.use(express.urlencoded({extended:true}))

// app.use('/api/productos', routerProducto)
// app.use('/api/carrito', routerCarrito)

// const contenedorProducto = new Producto('productos')
// const contenedorCarrito = new Carrito('carritos')

// //ENDPOINTS
// let administrador = false

// //PRODUCTOS
// routerProducto.get('/:id?', async (req,res) =>{
//   const id = parseInt(req.params.id)
//   if(!id){
//     contenedorProducto.findProducts().then(p => {
//         res.send({productos: p})
//     })
//   }else{
//       contenedorProducto.findProducts().then(p => {
//         if (isNaN(id)) {
//           return res.send(
//             { error: 'El id ingresado no es un número' }
//           )
//         }
//         if (id < 1 || id > p.length) {
//           return res.send({ error: `Producto con ID: ${id} No Encontrado` })
//         }
//         contenedorProducto.findProductById(id).then( prod =>{
//           res.send({producto: prod})
//         })
//       })
//     }
// })

// routerProducto.post('/', async (req,res) =>{
//   const producto = req.body
//   if(!administrador){
//     await contenedorProducto.createProduct(producto)
//     res.send(
//       {
//         mensaje: 'Producto agregado Correctamente',
//         producto: producto
//       }
//     )
//   }else{
//     res.send(
//       {
//         error : -1,
//         descripcion: `Ruta /`,
//         método: 'Post no authorized' }

//     )
//   }
// })

// routerProducto.put('/:id', async (req,res) =>{
//   const {id} = req.params
//   const {name, description,code, thumbnail, price, stock} = req.body
//   const producto = {
//     "timestamp": Date.now(),
//     "name": name,
//     "description": description,
//     "code": code,
//     "thumbnail": thumbnail,
//     "price": price,
//     "stock": stock
//   }
//   if(!administrador){
//     await contenedorProducto.updateProductById(id, producto)
//     res.send({
//       result: 'ok',
//       id: parseInt(id),
//       productoActualizado: producto
//     })
//   }else{
//     res.send(
//       {
//         error : -1,
//         descripcion: `Ruta /${id}`,
//         método: 'Put no authorized' }

//     )
//   }

// })

// routerProducto.delete('/:id', async (req,res) =>{
//   const id = parseInt(req.params.id)
//   if(!administrador){
//     await contenedorProducto.deleteProductById(id)
//     res.send({
//       result: 'Delete ok',
//       id: id,
//     })
//   }else{
//     res.send(
//       {
//         error : -1,
//         descripcion: `Ruta /${id}`,
//         método: 'Delete no authorized' }
//     )
//   }
// })
// routerProducto.all('*', (req, res) =>{
//   res.send(
//     {
//       error: -2,
//       description: `Ruta No valida`,
//       method: `Method No soportado`,
//     }
//   );
// })

// //CARRITO

// routerCarrito.post('/', async (req,res) =>{
//   contenedorCarrito.createCart().then(r => res.json(r))
// })

// routerCarrito.delete('/:id', async (req,res) => {
//   const id = parseInt(req.params.id)
//   contenedorCarrito.deleteCartById(id).then(p => {
//     if (isNaN(id)) {
//       return res.send(
//         {error: 'El id ingresado no es un número'}
//       )
//     }
//     if (id < 1) {
//       return res.send({error: `Producto con ID: ${id} No Encontrado`})
//     }
//     res.send({mensaje: `Carrito con ID: ${id} borrado `})
//   })
// })

// routerCarrito.get('/:id/productos', async (req,res) =>{
//   const id = parseInt(req.params.id)
//   contenedorCarrito.findCartById(id).then(p => {
//     if (isNaN(id)) {
//       return res.send({ error: 'El id ingresado no es un número' })
//     }

//     if (id < 1) {
//       return res.send({ error: 'productos no encontrado' })
//     }
//    res.send(p)
//   })
// })

// routerCarrito.post('/:id/productos', async (req,res) =>{
//   const id = parseInt(req.params.id)
//   const producto = req.body
//   res.send(
//     {
//       mensaje: await contenedorCarrito.insertProductToCart(id, producto),
//       producto: producto,
//       idCarrito: id
//     }
//   )
// })

// routerCarrito.delete('/:id/productos/:id_prod', async (req,res) =>{
//   const idCarrito = parseInt(req.params.id)
//   const idProducto = parseInt(req.params.id_prod)  
//     res.send({
//       result: await contenedorCarrito.deleteProductInCartById(idCarrito,idProducto),
//       idCarrito: idCarrito,
//       idProducto: idProducto
//     })
// })

// routerCarrito.all('*', (req, res) =>{
//   res.send(
//     {
//       error: -2,
//       description: `Ruta No valida`,
//       method: `Method No soportado`,
//     }
//   );
// })

// //SERVER
// const PORT = process.env.PORT || 8080

// app.listen(PORT, () => {
//   console.log('Servidor HTTP escuchando en el puerto ' + PORT)
// })
