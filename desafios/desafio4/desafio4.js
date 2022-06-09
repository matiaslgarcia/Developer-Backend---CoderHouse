//LIBRERIAS
const express = require('express')
const Contenedor = require('./contenedor')
const upload = require('./multer')

//DEPENDENCIAS
const { Router } = express
const app = express()
const router = new Router()

app.use(express.static('public'))
router.use(express.json())
router.use(express.urlencoded({extended:true}))

app.use('/api', router)
const contenedor = new Contenedor('./productos.txt')

//ENDPOINTS

router.get('/productos', async (req,res) =>{
    contenedor.getAll().then(resp =>
        res.send(resp)
    )
})

router.get('/productos/:id', async (req,res) =>{
    const id = parseInt(req.params.id)
    contenedor.getAll().then(p => {
        if (isNaN(id)) {
            return res.send({ error: 'El id ingresado no es un número' })
        }

        if (id < 1 || id > p.length) {
            return res.send({ error: 'productos no encontrado' })
        }

        contenedor.getById(id).then( prod =>{
            res.send(prod)
        })
    })
})

router.post('/productos', async (req,res) =>{
    const producto = req.body
    contenedor.save(producto)
        .then(p =>  res.json(p))
        .catch(e => res.error('Error al agregar un productos ' + e))
})


router.put('/productos/:id', async (req,res) =>{
    const {id} = req.params
    const {title, price, thumbnail} = req.body
    const producto = {
        "id": parseInt(id),
        "title": title,
        "price": price,
        "thumbnail": thumbnail,
    }
    contenedor.putById(id, producto).then(r =>{
        res.json({
            result: 'ok',
            id: parseInt(id),
            nuevo: producto
        })
    })
})

router.delete('/productos/:id', async (req,res) =>{
    const id = parseInt(req.params.id)
    contenedor.deleteById(id).then(p => {

        res.json({
            result: 'ok',
            id: id,
        })
        p
    } )
})


//SERVER
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})
