import mongoose from "mongoose";
import {transformarADTO} from "../dtos/PersonaDTO.js";

const personasSchema = new mongoose.Schema({
  id: {type: Number},
  nombre: {type: String},
  apellido: {type: String},
  dni: {type: String}
})

export default class PersonasDAOMongo{
  constructor(connectionString) {
    this.connectionString = connectionString
    this.personas = mongoose.model('Persona', personasSchema)
  }

  async init(){
    await mongoose.connect(this.connectionString)
    console.log('Personas DAO en mongoDB --> Ready')
  }

  async disconnect(){
    await mongoose.disconnect()
    console.log('Personas DAO en mongoDB --> Close')
  }

  async getAll(){
    const personas = await this.personas.find({})
    return transformarADTO(personas)
  }

  async getById(id){
    const persona = await this.personas.findOne({id: id})
    return transformarADTO(persona)
  }

  async save(newPersona){
    await this.personas.create(newPersona)
    return transformarADTO(newPersona)
  }

  async deleteById(id){
    const borrada = await this.personas.findOneAndDelete({id:id})
    return transformarADTO(borrada)
  }

  async deleteAll(){
    await this.personas.deleteMany({})
  }

  async updateById(id, modifPersona){
    const actPersona = await this.personas.findOneAndUpdate({id: id}, {$set: modifPersona})
    return transformarADTO(actPersona)
  }
}
