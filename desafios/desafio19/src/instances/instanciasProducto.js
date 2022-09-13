import knex from 'knex'
import {optionsMariaDB} from "../../config.js"
import Contenedor from '../persistence/contenedores/contenedor.js'
const knex1 = knex(optionsMariaDB)
const contenedor = new Contenedor(knex1, 'productos')

export default contenedor
