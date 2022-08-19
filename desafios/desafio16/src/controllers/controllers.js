import logger from  '../utils/logger.js'
import services from "../services/services.js";
import passport from "passport";

const allRoutes = async (req) =>{
  const{ url} = req
  logger.warn(`La ruta ${url} no esta implementada`)
}

const dirBarra = async (req, res) => {
  res.redirect('/landing')
}

const info = async (req, res) => {
  try{
    res.render('principalInfo.ejs',await services.getInformation())
  }catch (e) {
    res.send(e)
  }
}

const infoCompression = async (req, res) => {
  try{
    res.render('principalInfo.ejs',await services.getInformation())
  }catch (e) {
    res.send(e)
  }
}

const landing = async (req, res) => {
  res.render('principal.ejs', await services.getEmail())
}

const productTest = async (req, res) => {
  try{
    res.render('productosTest.ejs',await services.getProducts())
  }catch (e) {
    res.send(e)
  }
}

const randomElements = async () => {
  await services.getRandomsElements()
}

const failRegister = async (req,res) => {
  res.render('principalErrorSignup.ejs')
}

const registerUser = async (req, res) => {
  res.render('principalRegistrarUsuario.ejs')
}

const passportRegister = async () =>{
  return await services.getPassportRegister()
}

const logoutUser = async () => {
  return await services.getLogoutUser()
}

const loginUser = async () => {
  return await services.getLoginUser()
}

const faillogin = (req,res) => {
  res.render('principalErrorLogin.ejs')
}

const passportLogin = async () =>{
  return await services.getPassportLogin()
}

export default {
  allRoutes,
  landing,
  randomElements,
  productTest,
  info,
  infoCompression,
  dirBarra,
  loginUser,
  logoutUser,
  faillogin,
  passportLogin,
  registerUser,
  failRegister,
  passportRegister,
}
