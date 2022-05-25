const express = require('express')

const app = express()

app.set('views', './views')

// app.set('view engine', 'pug')
app.set('view engine', 'ejs')

// app.get('/datos', (req,res) =>{
//   res.render('nivel', req.query)
// })

app.get('/', (req,res) =>{
  res.render('pages/index',
    {mensaje: 'Bienvenidos a nuestra primer plantilla de ejs'}
    )
})
app.listen(8080)