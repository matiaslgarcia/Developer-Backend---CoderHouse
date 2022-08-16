import info from '../../api/instanciaInformacion.js'
import { Router } from "express"
import compression from 'compression'
import logger from "../../../utils/logger.js";

const generarInfo = new Router()

generarInfo.get('/info' ,async (req, res) => {
    try{
        //console.log(await info.solicitarInformacion())
        res.render('principalInfo.ejs',{informacion: await info.solicitarInformacion()})
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

/* -------------------------- DEBUG ---------------------------- */

//node --prof server.js
// node --prof-process slow-v8.log > prof_slow.txt
// node --inspect server.js
// chrome://inspect
//
// AMBOS TEST CON
// artillery quick -c 50 -n 20 "http://localhost:8080/info" > artillery_slow.txt
//
// /* ----------------------------------------------------------- */
// /* -------------------------- NO_DEBUG ---------------------------- */
//modo bloqueante
// node --prof server.js//node --prof-process fast-v8.log > prof_fast.txt
// node --inspect server.js
// chrome://inspect
// AMBOS TEST CON
// /artillery quick -c 50 -n 20 "http://localhost:8080/info" > artillery_fast.txt
// /* ------------------------------------------------------

//Autocannon
// 1ro: prender servidor npm start
// 2do: en otra consola, curl -X GET "http://localhost:8080/info"