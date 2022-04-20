const numeros = {}
const aleatorio = () =>{
    return  Math.floor(Math.random()*20+1)
}

for (let i = 0; i < 10000 ; i++) {
    const number = aleatorio()
    if(!numeros[number]) {
        numeros[number] = 0
    }
    numeros[number]++

}

console.log(numeros)

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

const getNombres = (productos) =>{
    nombres = []
    productos.forEach( prod => {
        nombres.push((prod.nombre))
    })
    return nombres.join(', ')
}


console.log(getNombres(productos))

const getPrecioTotal = (productos) =>{
    let precioTotal = 0
    productos.forEach( prod =>{
        precioTotal += prod.precio
    })
    return to2decimales(precioTotal)
}

// const getPrecioPromedio = (productos) =>{
//     if(productos.length ===0){
//         return 0
//     }
//     let precioTotal =
// }

const getProductoMasBarato = (productos) =>{
    if(productos.length ===0){
        return 0
    }
    let precioBarato = productos[0].precio;
    let prodBarato = productos[0].nombre

    productos.forEach( prod => {
        if(prod.precio < precioBarato ){
            precioBarato = prod.precio
            prodBarato = prod.nombre
        }
    })

    return `producto mas barato es ${prodBarato} y cuesta ${precioBarato}`
}

console.log(getProductoMasBarato(productos))

const getProductoMasCaro = (productos) =>{
    if(productos.length ===0){
        return 0
    }
    let precioCaro = productos[0].precio;
    let prodCaro = productos[0].nombre

    productos.forEach( prod => {
        if(prod.precio > precioCaro ){
            precioCaro = prod.precio
            prodCaro = prod.nombre
        }
    })

    return `producto mas caro es ${prodBarato} y cuesta ${precioBarato}`
}
const to2decimales = (valor) => {
    return Number(valor.toFixed(2))
