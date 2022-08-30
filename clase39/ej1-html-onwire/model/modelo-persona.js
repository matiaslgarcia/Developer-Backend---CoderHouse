class PersistenciaMemory{
  constructor(){
    this.personas = []
  }

  agregarPersona(persona){
    this.personas.push(persona)
  }

  obtenerPersonas(){
    return this.personas
  }
}

export default new PersistenciaMemory()
