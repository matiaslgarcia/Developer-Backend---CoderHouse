//Ejercicio 1 - Funcion
const mostrarLista = (lista) =>{

    lista.length > 0 ? lista.forEach(i => (console.log(i))): console.log('lista vacia');
}

const prueba = ['Hola', 'Como', 'estas']
mostrarLista(prueba)

//Ejercicio 2 - Funcion Anonima
let foo = function (lista) {
    lista.length >= 0 ? lista.forEach(i => (console.log(i))): console.log('lista vacia');
}
const prueba2 = [1, 4 ,6]
console.log(foo(prueba2))

//Ejercicio 3 - Funcion

const crearMultiplicador = (number) => {
    return  function (number2) {
        console.log( number * number2)
    }
}

const duplicar = crearMultiplicador(2)

const triplicar = crearMultiplicador(3)

duplicar(4)
triplicar(4)