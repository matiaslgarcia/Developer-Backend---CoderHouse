/*
*
* cookies
* son archivos que podemos guardar del lado del cliente
* en el navegador del usuario
*
* caracteristicas
*
* se le puede asignar tiempo de vida (termina su vida y se
* elimina del naveegador)
*
* no se deben almacen6ar datos sensibles en las cookies
*
* es un middleware que se requiere a nivel de aplicacion
*
* npm i cookie-parser --save
* const cookieParser = require('cookie-parser')
*
* Signed Cookies
*
* son cookies que tienen un mecanismo de validacion6 que
* consiste en adjuntar a cada cookie una encriptacion de su contenido
*
* cookieParser(secret)
*
* secret: string o array de strings que se utiliza para firmar
* cookies enviadas y analizar recibidas
*
* si es un string se utiliza como secret
* si es un6 array de strings , se firmara la cookie
* con c/string
*
* SESSION MEMORY
*
*  Es un paquete de Node, permite que una vble sea accesible desde
* cualquier lugar del sitio. Se almacena del lado del servidor
*
* Caracteristicas:
*  - la info queda guardada en el servidor
*  - se crea un id unico para poder acceder a dicha info desde el navegador
*  - los datos almacenados en session se borran al cerrar la ventana del navegador
*  - se utiliza para guardar datos de usuario al iniciar sesion
*
* npm i express-session --save
*
* guardar datos en una session
* req.session.contador
*
* eliminar datos de una session
* req.session.destroy
*
* middleware de autenticacion
* se puede limitar el acceso a determinadas rutas a aquellos usuarios
* que son6 admins
*
*
* */