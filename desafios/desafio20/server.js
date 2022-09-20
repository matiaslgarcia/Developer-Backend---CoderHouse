import cluster from 'cluster'
import * as os from 'os'
import {puerto, modo} from './config.js'
import {createServer} from "./createServer.js";
import logger from  './src/utils/logger.js'

if(modo === 'CLUSTER' && cluster.isMaster) {
  const numCpus = os.cpus().length

  logger.info('Numero de procesadores: ' + numCpus)
  logger.info('ID DE PROCESO:' + process.pid)

  for(let i=0; i<numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    logger.info('Worker ' + process.pid + ' murio', new Date().toLocaleString())
    cluster.fork()
  })
}else {
  //MIDDLEWARE
  process.on('exit', code => {
    logger.error('Salida con código de error: ' + code)
  })

  const app = await createServer()
  try {
    const connectedServer = await app.handler(puerto)
    logger.info(`proceso #${process.pid} escuchando en el puerto ${connectedServer.address().port} en modo ${modo}`)
  } catch (error) {
    logger.error(`Error en servidor ${error}`)
  }
}
