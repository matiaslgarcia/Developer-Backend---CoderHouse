
function generarNumerosRandom(cantidad){
    const numeros = {}
    for (let i = 1; i <= parseInt(cantidad) ; i++) {
        const numero = Math.floor((Math.random() * (20000)) + 1)
        if (!numeros[numero]) {
            numeros[numero] = 0
        }
        numeros[numero]++
    }
    return numeros
}

process.on('exit', () => {
    console.log(`Proceso #${process.pid}: Terminado`)
  })

process.on('message', numeros => {
    console.log(`Proceso #${process.pid}: Se está iniciando`)
    const sum = generarNumerosRandom(numeros)
    process.send(sum)
    console.log(`Proceso #${process.pid}: Finalizó`)
    process.exit()
})

process.send('preparado')