//Promise  (Promesas)

const dividir = (dividiendo ,divisor) =>{
    return new Promise((resolve,reject) =>{
        if (divisor == 0){
            reject ('error')
        }else{
            resolve( dividiendo/divisor)
        }
    })
}

dividir(10, 2)
    .then( res => {console.log(`resultado: ${res}`)})
    .catch( e => {console.log(`error: ${e}`)})