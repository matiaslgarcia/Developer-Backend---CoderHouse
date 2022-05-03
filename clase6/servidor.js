const http = require('http')

const server = http.createServer((req,res) =>{
    res.end(getMensaje())
})
const PORT = 8080
const connectedServer = server.listen(PORT, () =>{
    console.log('Servidor corriendo en el 8080')
})

const getMensaje = () => {
    const  hora = new Date().getHours()
    switch (hora) {
        case hora>=6 && hora<=12:
            return 'Buenos dias';
        case hora>12 && hora<=19:
            return 'Buenas tardes'
        default: return 'Buenas noches'
    }
}