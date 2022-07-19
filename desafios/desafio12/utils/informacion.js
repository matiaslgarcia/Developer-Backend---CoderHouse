import process from 'process'

export default class Informacion {
    async solicitarInformacion(){
        const nuevaInformacion = {
            "argumento": process.argv[1],
            "sistemaOperativo": process.platform,
            "versionNJS": process.version,
            "memoria": process.memoryUsage().rss,
            "path": process.cwd(),
            "procesId":process.pid,
            "carpetaProyecto": process.cwd()
        }
        return nuevaInformacion
    }
}