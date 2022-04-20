const moment = require('moment')

const hoy = moment()

const nacimiento = moment('24/11/1994', 'DD/MM/YYYY')

const cantDias = hoy.diff(nacimiento, 'day')
const cantYear = hoy.diff(nacimiento, 'year')
console.log(cantDias)
console.log(cantYear)