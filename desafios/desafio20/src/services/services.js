import info from '../../src/instances/instanciaInformacion.js'
import cantRandom from '../utils/cantRandom.js'
import { fork } from 'child_process'
import producto from "../instances/instanciaProductoTest.js";
import path from "path";

const getInformation = () =>{
  return info.solicitarInformacion()
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

const getRandomsElements = async (req,res) =>{
  const computo = fork(path.resolve(process.cwd(),'./src/utils/random.js'))
  let cantidad = cantRandom(req.params.cantidad)
  computo.on('message', resultado => {
    if (resultado === 'preparado') {
      computo.send(cantidad)
    } else {
      res.json({ resultado })
    }
  })
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

export default {
  getInformation,
  getEmail,
  getProducts,
  getRandomsElements,
  getLogoutUser,
  getLoginUser,
}
