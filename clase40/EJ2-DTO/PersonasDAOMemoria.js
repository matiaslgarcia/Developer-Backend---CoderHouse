export default class PersonasDAOMemoria {

  constructor() {
    this.personas = [];
  }

  getIndex(id){
    return this.personas.findIndex(persona => persona.id === id)
  }

  getAll(){
    return this.personas
  }

  getById(id){
    return this.personas[this.getIndex(id)]
  }

  savePersonas(newPersona){
    this.personas.push(newPersona)
    return newPersona
  }

  deleteById(id){
    const {borrada} = this.personas.splice(this.getIndex(id), 1)
    return borrada
  }

  deleteAll(){
    return this.personas = []
  }

  updateById(id, modifPersona){
    const index = this.getIndex(id)
    const actPersona = { ...this.personas[index], ...modifPersona}
    this.personas.splice(index,actPersona)
    return actPersona
  }
}
