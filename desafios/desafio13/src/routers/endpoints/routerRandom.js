import { Router } from "express"
import { fork } from 'child_process'
import path from 'path'

const generarRandom = new Router()

generarRandom.get('/randoms/:cantidad?', (req, res) => {
    const computo = fork(path.resolve(process.cwd(),'../../../utils/random.js'))
    const cantidad = req.params.cantidad || 100000000
    computo.on('message', resultado => {
        if (resultado === 'preparado') {
            computo.send(cantidad)
        } else {
            res.json({ resultado })
        }
    })
})

export default generarRandom