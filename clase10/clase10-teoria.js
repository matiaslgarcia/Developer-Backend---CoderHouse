//PUG
/*
* Es un motor de plantilla que utiliza archivos estaticos
* Es facil implementar
* se instala con npm install pug
*
* Configuracion
* crear dir llamada views
* indicar a express que pug se va a utilizar
* app.set('view engine', 'pug')
* res.render(view: string, optins
* */

//EJS

/*
* Effective Javascript templating
* Es un motor de visualizcion tematicos mas popular
* Significa plantillas de js incrustadas
* Lo usamos del lado del servidor
* Es facil de configurar
*
* npm i ejs
* app.set('view engine', 'ejs')
* creamos dir "views"
* res.render()
* utiliza la siguiente sintaxis
*
* <%= incrusta un valor
* <%- incrusta un valor renderizado como html
* <%  admite js
*
* */