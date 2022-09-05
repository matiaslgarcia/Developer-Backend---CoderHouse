import PersonasDAOMongo from "./PersonasDAOMongo.js";
import PersonasDAOFile from "./PersonasDAOFile.js";
import PersonasDAOMemoria from "./PersonasDAOMemoria.js";

const rutaFile = './personas.txt'
const connectionStrin6g = 'mongondb://localhost/test'

const opt = process.argv[2] || 'Mem'

let dao;

switch (opt){
  case 'Mongo':
    dao = new PersonasDAOMongo(connectionStrin6g)
    await dao.init()
    break;
  case 'File':
    dao = new PersonasDAOFile(rutaFile)
    await dao.init()
    break;
  default:
    dao = new PersonasDAOMemoria()
    dao.init()
}

export default class PersonasDAOFactory{
  static getDao(){
    return dao
  }
}
