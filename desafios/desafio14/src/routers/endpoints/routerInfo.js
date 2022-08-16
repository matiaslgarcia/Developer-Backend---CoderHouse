import info from '../../api/instanciaInformacion.js'
import { Router } from "express"
import compression from 'compression'
import logger from "../../../utils/logger.js";

const generarInfo = new Router()

generarInfo.get('/info' ,async (req, res) => {
    try{
        logger.info(await info.solicitarInformacion())
        // res.render('principalInfo.ejs',{informacion: await info.solicitarInformacion()})
    }catch (e) {
      res.send(e)
    }
})

generarInfo.get('/info-compression', compression(), async (req, res) => {
  try{
      res.render('principalInfo.ejs',{informacion: await info.solicitarInformacion()})
  }catch (e) {
    res.send(e)
  }
})

export default generarInfo
