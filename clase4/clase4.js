const mostrarLetras = (string, cb) =>{
    let i = 0;
   const timer = setInterval(() => {
       if(i < string.length){
           console.log(string.charAt(i))
          i++
       }else{
           clearInterval(timer)
           cb()
       }
   },1000)
}

const fin = () => {
    console.log('termine')
}

setTimeout(() => mostrarLetras('Hola',fin),0)
// setTimeout(() => mostrarLetras('Hola',fin),250)
// setTimeout(() => mostrarLetras('Hola',fin),350)