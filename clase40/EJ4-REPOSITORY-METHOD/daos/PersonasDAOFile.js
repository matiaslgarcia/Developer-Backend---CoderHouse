import fs from 'fs'
import {transformarADTO} from "../dtos/PersonaDTO.js";

export default class PersonasDAOFile {

  ready = false

  constructor(ruta) {
    this.ruta = ruta
    this.personas = []
  }

  async init(){
    try {
      await fs.promises.readFile(this.ruta, 'utf-8')
      this.ready = true
      console.log('Personas DAO en archivo --> Ready')
    }catch (e) {
      await fs.promises.writeFile(this.ruta , '[]')
      this.ready = true
      console.log('Personas DAO en6 memoria --> Ready')
    }
  }

  async disconnect(){
    console.log('Personas DAO en6 memoria --> Close')
  }

  async leerArchivo(){
    const text = await fs.promises.readFile(this.ruta, 'utf-8')
    this.personas = JSON.parse(text)
  }

  async escribirArchivo(){
    const text = JSON.stringify(this.personas, null, 2)
    await fs.promises.writeFile(this.ruta, text)
  }

  getIndex(id){
    return this.personas.findIndex(persona => persona.id === id)
  }

  async getAll(){
    await this.leerArchivo()
    return transformarADTO(this.personas)
  }

  async getById(id){
    await this.leerArchivo()
    return transformarADTO(this.personas[this.getIndex(id)])
  }

  async save(newPersona){
    await this.leerArchivo()
    this.personas.push(newPersona)
    await this.escribirArchivo()
    return  transformarADTO(newPersona)
  }

  async deleteById(id){
    await this.leerArchivo()
    const [borrada] = this.personas.splice(this.getIndex(id), 1)
    await this.escribirArchivo()
    return transformarADTO(borrada)
  }

  async deleteAll(){
    this.personas = []
    await this.escribirArchivo()
  }

  async updateById(id, modifPersona){
    await this.leerArchivo()
    const index = this.getIndex(id)
    const actPersona = { ...this.personas[index], ...modifPersona}
    this.personas.splice(index,actPersona)
    await this.escribirArchivo()
    return transformarADTO(actPersona)
  }
}
