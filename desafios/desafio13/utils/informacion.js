import process from 'process'

export default class Informacion {
    async solicitarInformacion(){
        const nuevaInformacion = {
            "argumento": process.argv,
            "sistemaOperativo": process.platform,
            "versionNJS": process.version,
            "memoria": process.memoryUsage().rss,
            "path": process.execPath,
            "procesId":process.pid,
            "carpetaProyecto": process.cwd()
        }
        return nuevaInformacion
    }
}