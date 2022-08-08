import process from 'process'
import * as os from 'os'

export default class Informacion {
    async solicitarInformacion(){
        return {
            "argumento": process.argv,
            "sistemaOperativo": process.platform,
            "versionNJS": process.version,
            "memoria": process.memoryUsage().rss,
            "numeroProcesadores": os.cpus().length,
            "path": process.execPath,
            "procesId": process.pid,
            "carpetaProyecto": process.cwd()
        }
    }
}