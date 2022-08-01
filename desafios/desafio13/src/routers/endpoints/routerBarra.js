import autorizacionWeb from "../../../utils/autenticacion"
import { Router } from "express"

const generarDireccionBarra = new Router()

generarDireccionBarra.get('/', autorizacionWeb, (req, res) => {
    res.redirect('/landing')
})

export default generarDireccionBarra