import {transformarADTO} from "../dtos/PersonaDTO.js";

export default class PersonasDAOMemoria {
  constructor() {
    this.personas = [];
  }

  init(){
    console.log('Personas DAO en6 memoria --> Ready')
  }

  disconnect(){
    console.log('Personas DAO en6 memoria --> Close')
  }

  getIndex(id){
    return this.personas.findIndex(persona => persona.id === id)
  }

  getAll(){
    return transformarADTO(this.personas)
  }

  getById(id){
    return  transformarADTO(this.personas[this.getIndex(id)])
  }

  save(newPersona){
    this.personas.push(newPersona)
    return transformarADTO(newPersona)
  }

  deleteById(id){
    const [borrada] = this.personas.splice(this.getIndex(id), 1)
    return transformarADTO(borrada)
  }

  deleteAll(){
    return this.personas = []
  }

  updateById(id, modifPersona){
    const index = this.getIndex(id)
    const actPersona = { ...this.personas[index], ...modifPersona}
    this.personas.splice(index,actPersona)
    return transformarADTO(actPersona)
  }

  savePersonas(newPersona){
    this.personas.push(newPersona)
    return  transformarADTO(newPersona)
  }

  deleteById(id){
    const [borrada] = this.personas.splice(this.getIndex(id), 1)
    return transformarADTO(borrada)
  }

  deleteAll(){
    return this.personas = []
  }

  updateById(id, modifPersona){
    const index = this.getIndex(id)
    const actPersona = { ...this.personas[index], ...modifPersona}
    this.personas.splice(index,actPersona)
    return transformarADTO(actPersona)
  }
}