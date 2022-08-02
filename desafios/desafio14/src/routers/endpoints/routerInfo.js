import info from '../../api/instanciaInformacion.js'
import { Router } from "express"

const generarInfo = new Router()

generarInfo.get('/info' ,async (req, res) => {
    try{
        res.render('principalInfo.ejs',{informacion: await info.solicitarInformacion()})
    }catch (e) {
      res.send(e)
    }
})

export default generarInfo