import * as model from '../model/modelo-persona'

export const obtenerPersonas = async () => {
  return model.default.obtenerPersonas();
}

export const agregarPersona = async (persona) => {
  await model.default.agregarPersona(persona)
}
