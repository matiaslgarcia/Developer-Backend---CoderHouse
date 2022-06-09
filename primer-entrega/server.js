//LIBRERIAS
const express = require('express')
const { Router } = express
const Producto = require('./producto')
const Carrito = require('./carrito')

//DEPENDENCIAS
const app = express()
const routerProducto = new Router()
const routerCarrito = new Router()

app.use(express.static('public'))
routerProducto.use(express.json())
routerCarrito.use(express.json())

routerProducto.use(express.urlencoded({extended:true}))
routerCarrito.use(express.urlencoded({extended:true}))

app.use('/api/productos', routerProducto)
app.use('/api/carrito', routerCarrito)
const contenedorProducto = new Producto('./productos.txt')
const contenedorCarrito = new Carrito('./carrito.txt')

//ENDPOINTS
let admin = false

//PRODUCTOS
routerProducto.get('/:id?', async (req,res) =>{
  const id = parseInt(req.params.id)
  if(!id){
    contenedorProducto.getAll().then(p => {
        res.send({productos: p})
    })
  }else{
      contenedorProducto.getAll().then(p => {
        if (isNaN(id)) {
          return res.send(
            { error: 'El id ingresado no es un número' }
          )
        }
        if (id < 1 || id > p.length) {
          return res.send({ error: `Producto con ID: ${id} No Encontrado` })
        }
        contenedorProducto.getById(id).then( prod =>{
          res.send({producto: prod})
        })
      })
    }
})

routerProducto.post('/', async (req,res) =>{
  const producto = req.body
  if(!admin){
    await contenedorProducto.save(producto)
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
  const {id} = req.params
  const {name, description,code, thumbnail, price, stock} = req.body
  const producto = {
    "id": parseInt(id),
    "timestamp": Date.now(),
    "name": name,
    "description": description,
    "code": code,
    "thumbnail": thumbnail,
    "price": price,
    "stock": stock
  }
  if(!admin){
    await contenedorProducto.putById(id, producto)
    res.send({
      result: 'ok',
      id: parseInt(id),
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
  const id = parseInt(req.params.id)
  if(!admin){
    await contenedorProducto.deleteById(id)
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
  contenedorCarrito.saveCarrito().then(r => res.json(r))
})

routerCarrito.delete('/:id', async (req,res) => {
  const id = parseInt(req.params.id)
  contenedorCarrito.deleteCarritoById(id).then(p => {
    if (isNaN(id)) {
      return res.send(
        {error: 'El id ingresado no es un número'}
      )
    }
    if (id < 1) {
      return res.send({error: `Producto con ID: ${id} No Encontrado`})
    }
    res.send({mensaje: `Carrito con ID: ${id} borrado `})
  })
})

routerCarrito.get('/:id/productos', async (req,res) =>{
  const id = parseInt(req.params.id)
  contenedorCarrito.getCarritoById(id).then(p => {
    if (isNaN(id)) {
      return res.send({ error: 'El id ingresado no es un número' })
    }

    if (id < 1) {
      return res.send({ error: 'productos no encontrado' })
    }
   res.send(p)
  })
})

routerCarrito.post('/:id/productos', async (req,res) =>{
  const id = parseInt(req.params.id)
  const producto = req.body
  await contenedorCarrito.saveProductToCarrito(id, producto)
  res.send(
    {
      mensaje: 'Producto agregado Correctamente al carrito',
      producto: producto,
      idCarrito: id
    }
  )
})

routerCarrito.delete('/:id/productos/:id_prod', async (req,res) =>{
  const idCarrito = parseInt(req.params.id)
  const idProducto = parseInt(req.params.id_prod)
  await contenedorCarrito.deleteProductoTheCarritoById(idCarrito,idProducto)
    res.send({
      result: 'ok',
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
