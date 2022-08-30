import * as negocio from '../services/service-persona'

// HTML ON WIRE
export const getHTMLOnwire = async (res) =>{
  res.render('plantilla-html-onwire', {personas: await negocio.obtenerPersonas() })
}

export const postHTMLOnwire = async (req,res) =>{
  let persona = req.body
  await negocio.agregarPersona(persona)
  res.redirect('/html-onwire')
}

// DATA ON WIRE
export const getDataOnwire = async (res) =>{
  res.sendFile(process.cwd() + './views/plantilla-data-onwire.html')
}

export const postDataOnwire = async (req,res) =>{
  let persona = req.body
  await negocio.agregarPersona(persona)
  res.json({persona})
}

export const getDataJSON = async (req,res) =>{
  res.json({personas: await negocio.obtenerPersonas()})
}
