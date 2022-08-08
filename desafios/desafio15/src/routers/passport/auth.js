import passport from 'passport'
import { Router } from 'express'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy} from 'passport-local'
import user from '../../api/instanciaUsuario.js'

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    const usuario = await user.findUser(email)
    if(usuario){
      return done(null, false)
    }
    const userNuevo = {
      email: email,
      passwordHash: bcrypt.hashSync(password,10)
    }
    await user.saveUsuario(userNuevo)
    return done(null, userNuevo)
  }
))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password,done) => {
  const usuario = await user.findUser(email)
  const passwordValidate = usuario && bcrypt.compareSync(password,usuario.passwordHash)
  if(passwordValidate){
    return done(null,usuario)
  }
  return done(null,false,{
    message: 'Email y/o password invalido'
  })
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

loginUser.post('/login',passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/landing'}))

loginUser.get('/login', (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/landing')
  }
  res.render('principalLogueoUsuario.ejs')
})

loginUser.get('/faillogin',(req,res) => {
  res.render('principalErrorLogin.ejs')
})

loginUser.get('/logout', (req, res) => {
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
})

registerUser.get('/failregister',(req,res) => {
  res.render('principalErrorSignup.ejs')
})

registerUser.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect:'/'}))

registerUser.get('/register', async (req, res) => {
  res.render('principalRegistrarUsuario.ejs')
})

export {loginUser,registerUser}