import passport from 'passport'
import { Router } from 'express'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy} from 'passport-local'
import user from '../../instances/instanciaUsuario.js'
import path from 'path'
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
      foto: {
        data: fs.readFileSync(path.join(__dirname + '/imagenes/' + req.file.filename)),
        contentType: 'image/png'
      }
    }
    await user.saveUsuario(userNuevo)
    return done(null, true,{
      usuarioNuevo: userNuevo
    })
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
    return done(null,true, {
      user: usuario
    })
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
 const getUser = await user.findUser(req.params.email)
  res.send({usuario: getUser})
})

loginUser.get('/faillogin',(req,res) => {
  res.send({error: 'Error al realizar el Login'})
  // res.render('principalErrorLogin.ejs')
})

loginUser.get('/logout', (req, res) => {
  const email = req.session?.email
  if (email) {
      req.session.destroy(err => {
          if (!err) {
              res.send({desloguearse: `Se deslogueo el usuario: ${email}`})
          } else {
              res.redirect('/')
          }
      })
  } else {
      res.redirect('/')
  }
})

registerUser.get('/failregister',(req,res) => {
  res.send({error: 'Error al realizar el registro'})
})

registerUser.post('/register' ,passport.authenticate('local-register',
{
  successRedirect:'/',
  failureRedirect: '/failregister'
}))

// registerUser.get('/register', async (req, res) => {
//   res.send({usuarioActual: })
// })

export {loginUser,registerUser}
