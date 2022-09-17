import passport from 'passport'
import logger from '../../utils/logger.js'
import { Router } from 'express'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy} from 'passport-local'
import user from '../../instances/instanciaUsuario.js'
import sendEMail from "../../utils/sendMail.js";
import path from 'path'
import * as fs from "fs";
import upload from "../../utils/multer.js";

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const usuario = await user.findUser(email)
    if(usuario){
      return done(null, false)
    }
    const userNuevo = {
      email: email,
      passwordHash: bcrypt.hashSync(password,10),
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      edad: req.body.edad,
      telefono: req.body.telefono,
  /*    foto: {
        data: fs.readFileSync(path.join(__dirname + '/imagenes/' + req.file.filename)),
        contentType: 'image/png'
      }*/
    }
    await user.saveUsuario(userNuevo)
    await sendEMail(userNuevo)
    return done(null, userNuevo)
  }
))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password,done) => {
  const usuario = await user.findUser(email)
  const passwordValidate = usuario && bcrypt.compareSync(password, usuario.password)
  //Ver lógica para retorno de pantallas
  if(passwordValidate){
    return done(null, usuario)
  }
  return done(null,false,
    logger.warn('Email y/o password invalido'),
  )
}))

passport.serializeUser(function (usuario,done){
  done(null,usuario.email)
})

passport.deserializeUser( async function (email, done){
  const usuario = await user.findUser(email)
  done(null, usuario)
})

const registerUser = new Router()
const loginUser = new Router()

loginUser.post('/login',passport.authenticate('local-login',
{
successRedirect: '/landing',
failureRedirect: '/faillogin'
}
))

loginUser.get('/login', async (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/landing')
  }
  res.render('principalLogueoUsuario.ejs')
})

loginUser.get('/faillogin',(req,res) => {
  res.render('principalErrorLogin.ejs')
})

loginUser.get('/logout', (req, res) => {
  logger.info(req.session)
  const email = req.session?.passport.user
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
})

registerUser.get('/failregister',(req,res) => {
  res.render('principalErrorSignup.ejs')
})

registerUser.post('/register', passport.authenticate('local-register',
{
  successRedirect:'/',
  failureRedirect: '/failregister'
}))

registerUser.get('/register', async (req, res) => {
  res.render('principalRegistrarUsuario.ejs')
})

export {loginUser,registerUser}
