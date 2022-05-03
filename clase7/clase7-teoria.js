/*
* Get utilizamos para obtener  informacion desde el servidor
*
* la manera de hacerlo con express es
*
* app.get(url, (req,res) =>{
*
* }
*
* Si queremos obtener una informacion precisa lo hacemos a
* traves  de un identificador, utilizando dos puntos
* y lo accedemos con el campo params
*
* * app.get('/api/mnensajes/:id', (req,res) =>{
*   logica
*   req.params.id
*   res.send( )
* }
*
*
* Post utilizamos para enviar algun dato del cliente al servidor
*
* En express seria
*
* app.post('/api/mensajes', (req,res) =>{
*
* }
* para acceder al cuerpo del pensaje lo hacemos por el campo "body"
*
*  app.post('/api/mensajes', (req,res) =>{
*   const mensaje = req.body
* }
*
* PUT utilzamos para actualizar un registro
*
* * app.put('/api/mensajes/:id', (req,res) =>{
*
*   1. Hallar el recurso con id == req.params.id
*   2. Reemplazar el registro recibido en req.body
*
*   res.json ({
*       result: 'ok',
*       id: req.params.id,
*       nuevo: req.body
*   })
* }
*
*
* DELETE utilizamos para borrar una peticion
*
* * app.put('/api/mensajes/:id', (req,res) =>{
*
*   1. Hallar el recurso con id == req.params.id
*
*   res.json ({
*       result: 'ok',
*       id: req.params.id,
*   })
* }

* */

//Para que express entienda de manera automatica
// interpretar JSON lo debemos indicar asi:

/*
*  app.use(express.json())
*  app.use(express.urlencoded({ extended: true}))
* */