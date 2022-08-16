import logger from "./logger.js";

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
   logger.info(`Proceso #${process.pid}: Terminado`)
  })

process.on('message', numeros => {
    logger.info(`Proceso #${process.pid}: Se está iniciando`)
    const sum = generarNumerosRandom(numeros)
    process.send(sum)
    logger.info(`Proceso #${process.pid}: Finalizó`)
    process.exit()
})

process.send('preparado')
