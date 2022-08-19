import info from '../utils/informacion.js'
import cantRandom from '../utils/cantRandom.js'
import producto from "../instances/instanciaProductoTest.js";
import path from "path";
import passports from '../utils/passports.js';

const getInformation = async () =>{
  return await info.solicitarInformacion()
}

const getEmail = async (req) =>{
  return {email: req.session.email }
}

const getProducts = async () =>{
  return {
    productos: await producto.crearProductosParaFront(),
    prodExists: await producto.crearProductosParaFront().length !==0
  }
}

const getRandomsElements = async (res) =>{
  // const computo = fork(path.resolve(process.cwd(),'../../../utils/random.js'))
  const computo = path.resolve(process.cwd(),'../utils/random.js')
  let cantidad = cantRandom()
  computo.on('message', resultado => {
    if (resultado === 'preparado') {
      computo.send(cantidad)
    } else {
      res.json({ resultado })
    }
  })
}

const getPassportRegister = async () =>{
  return passports.returnRegister()
}

const getLogoutUser = async (req, res) => {
  const email = req.session?.email
  if (email) {
    req.session.destroy(err => {
      if (!err) {
        res.render('principalDeslogueo.ejs', { email })
      } else {
        res.redirect('/')
      }
    })
  } else {
    res.redirect('/')
  }
}

const getLoginUser = async (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/landing')
  }
  res.render('principalLogueoUsuario.ejs')
}

const getPassportLogin = async () =>{
  return passports.returnLogin()
}
export default {
  getInformation,
  getEmail,
  getProducts,
  getRandomsElements,
  getPassportRegister,
  getLogoutUser,
  getLoginUser,
  getPassportLogin
}
