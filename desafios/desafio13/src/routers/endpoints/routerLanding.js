import autorizacionWeb from "../../../utils/autenticacion"
import { Router } from "express"

const generarLanding = new Router()

generarLanding.get('/landing', autorizacionWeb, (req, res) => {
    res.render('principal.ejs', { email: req.session.email })
})

export default generarLanding