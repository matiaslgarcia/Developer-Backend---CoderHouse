/*
* Clase 8 - Router and Multer
*
* Router, es una clase que se la utiliza para crear
* un nuevo objeto de enrutador, una instancia aislada
* de middleware y rutas
*
* Express nos permite crear routers para multiples "mini-
* aplicaciones"
*
* const express = require('express')
* const {Router} = express
*
* const app = express()
* const router = Router()
*
* router.get('/recurso', (req,res) =>{
*       res.send('get ok')
* })
*
*  router.post('/recurso', (req,res) =>{
*       res.send('post ok')
* })
*
* app.use('/api', router) //ruta padre
*
*
* */

/*
* Archivos statics
* se utiliza la palabra reservada "express.static"
* recibe como parametro el nombre de la carpeta que contiene los archivos estaticos
* Esto nos sirve para la manipulacion de imagenes, css, js etc
*
* app.use(express.static('public'))
*
* se puede agregar un prefijo virtual (el path no existe fisicamente)
*
* app.use('/static', express.static('public'))
*
* Path absoluto
*app.use('/static', express.static(__dirname + '/public'))
*
* */

/*
*Middleware
*  son funciones que tienen acceso al objeto de solicitud req y objeto de respuesta res
* y a una funcon de middleware llamada next
*
* Tipos de middleware
* - A nivel de aplicacion
*       funcion sin ninguna via de acceso de montaje
*       Se ejecuta siempre en cada solicitud
*
*       var app = express()
*       app.use( (req, res, next) =>{
*           console.log('algo)
*           next()
*       })
*
* - A nivel de ruta
*       funcion para agregar una o muchas funciones middleware en los procesos
*       de atencion de las rutas
*
* - A nivel de router
*   funciona lo mismo que a nivel de aplicacion solo que esta enlazado a una instancia
*   de express.Router()
*
*  var app = express()
*  var router = express.Router()
*       router.use( (req, res, next) =>{
*           console.log('algo)
*           next()
*       })
*
*
* - manejo de errores
*   funciones para manejar errores
*
*       app.use( (error,req, res, next) =>{
*           console.log(error.stack)
*           res.status(500, send('algo'))
*           next()
*       })
*
*  - Incorporado
*   funcion responsable de servicio de archivos estaticoos
*
        objeto options puede aceptar propiedades: dotfiles, etag, extensiones, index
        * lastModified, maxAge, redirect, setHeaders
        *
*       app.use( express.static('public', options))
* */

/*
* MULTER
* es una libreria nos permite el manejo de archivos en una api
* permite subir archivos de un front a un servidor
*
* const multer = require('multer')
*
* */