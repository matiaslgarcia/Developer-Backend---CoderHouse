export default function autorizacionWeb(req, res, next) {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('/login')
    }
  }

