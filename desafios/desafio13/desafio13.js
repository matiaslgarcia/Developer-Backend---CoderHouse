import cluster from 'cluster'
import * as os from 'os'
import {puerto, modo} from './config.js'
import {createServer} from "./createServer.js";

if(modo === 'CLUSTER' && cluster.isMaster) {
  const numCpus = os.cpus().length

  console.log('Numero de procesadores: ' + numCpus)
  console.log('ID DE PROCESO:' + process.pid)

  for(let i=0; i<numCpus; i++) {
      cluster.fork()
  }

  cluster.on('exit', worker => {
      console.log('Worker ' + process.pid + ' murio', new Date().toLocaleString())
      cluster.fork()
  })
}else {
    //MIDDLEWARE
    console.log(process.argv)
    process.on('exit', code => {
      console.log('Salida con código de error: ' + code)
    })

    const app = await createServer()
    try {
        const connectedServer = await app.handler(puerto)
        console.log(`proceso #${process.pid} escuchando en el puerto ${connectedServer.address().port} en modo ${modo}`)
    } catch (error) {
        console.log(`Error en servidor ${error}`)
    }
}

//SERVER CONFIG

// -------------- MODO FORK -------------------
//pm2 start server.js --name="Server1" --watch -- 8081 FORK

// -------------- MODO CLUSTER -------------------
//pm2 start server.js --name="Server2" --watch -i max -- 8082 CLUSTER´

//Si hay problemas de ejecucion por bloqueo del sistema, ejecutar PowerShell en modo admin
// y ejecutar: Set-ExecutionPolicy Unrestricted

//pm2 list
//pm2 delete id/name
//pm2 desc name
//pm2 monit
//pm2 --help
//pm2 logs
//pm2 flush
