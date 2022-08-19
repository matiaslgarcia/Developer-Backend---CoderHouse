import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import user from "../instances/instanciaUsuario.js";
import bcrypt from "bcrypt";

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
  const passwordValidate = usuario && bcrypt.compareSync(password, usuario.passwordHash)
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

const returnRegister = async () =>{
  return passport.authenticate('local-register',
    {
      successRedirect:'/',
      failureRedirect: '/failregister'
    })
}

const returnLogin = async () =>{
  return passport.authenticate('local-login',
    {
      successRedirect: '/landing',
      failureRedirect: '/faillogin'
    }
  )
}

export default {
  returnRegister,
  returnLogin,
}
