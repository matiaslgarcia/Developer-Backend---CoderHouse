import knex from 'knex'
import optionsMariaDB from "../DB/connectionSQL.js"
import Contenedor from '../../contenedores/contenedor.js'
const knex1 = knex(optionsMariaDB)
const contenedor = new Contenedor(knex1, 'productos')


export default contenedor
