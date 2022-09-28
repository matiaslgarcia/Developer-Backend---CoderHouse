import user from "../instances/instanciaUsuario.js"
import logger from "./logger.js"

const usuario = async (req) => {
    let usuarioBuscado = await user.findUser(req.session.passport.user)
    return usuarioBuscado.admin
}

export default usuario