import * as negocio from '../services/service-persona'

export const getHTMLOnwire = async (res) =>{
  res.render('plantilla-html-onwire', {personas: await negocio.obtenerPersonas() })
}

export const postHTMLOnwire = async (req,res) =>{
  let persona = req.body
  await negocio.agregarPersona(persona)
  res.redirect('/html-onwire')
}
