const http = require('http')

const server = http.createServer((req,res) =>{
    res.end('Nuestro primer servidor')
})

const connectedServer = server.listen(8080, () =>{
    console.log('Servidor corriedno en el 8080')
})