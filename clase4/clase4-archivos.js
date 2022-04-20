//Manejo de archivos
// Se utiliza fs  (file system)
// se la importa como
// const fs = require('fs')

//fs SINCRONICO
/*
*   readFileSync = lectura
*   writeFileSync = escritura
*   appendFileSync = actualizar
*   unlinkSync = borrar
*   mkdirSync = crear
*
*   fs.readFileSync ('ruta' , 'utf-8')
*   fs-wrieFileSync ('ruta', 'texto a sobreescribir')
*   fs.appendFileSync ('ruta', 'texto a agregar')
*   fs.unlinkSync('ruta a borrar')
*
*  ERRORES
*  Lo manejamos con try/catch
* */

/* ASINCRONISMO
    readFile = lectura
*   writeFile = escritura
*   appendFile = actualizar
*   unlink = borrar
*   mkdir = crear

*  fs.readFileSync ('ruta' , 'utf-8', CALLBACK)
*   fs-wrieFileSync ('ruta', 'texto a sobreescribir', callback)
*   fs.appendFileSync ('ruta', 'texto a agregar', callback)
*   fs.unlinkSync('ruta a borrar',callback)
    fs.readdir

    promesas (async await)
    fs.promises.readFile('ruta', 'utf-8')
        .then
        -catch

* */


const fs = require('fs')
let data = ''
try {
    data = fs.readFile('./text', 'utf-8', (error, contend) =>{
        if(error){
            console.log('error', error)
        }else{
            console.log(contend)
        }
    })
}catch (e) {
    console.log(e)
}