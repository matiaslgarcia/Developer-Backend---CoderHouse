import express from "express";
import {faker } from '@faker-js/faker'
faker.locale = 'es'

const app = express()

// const nombres = ['Lui', 'Luis','Luiss']
// const apellidos = ['riv', 'riva','rivas']
// const colores = ['azul', 'rojo','verde']
//
// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)]
// }

function createRandomUser(id) {
  return {
    id: id,
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    color: faker.color.human(),
  }
}

app.get('/test', (req, res) => {
  const cont = Number(req.query.cant) || 10
  res.json(Array.from(new Array(cont), (v,i) => createRandomUser(i+1)))
})

const PORT = 8080
app.listen(PORT, () => {
  console.log('server run')
} )