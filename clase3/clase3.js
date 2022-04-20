//callbacks. Permite a una funcion recibir como parametro otra funcion y ejecutarla

const ejecutar = unaFuncion => unaFuncion()
const saludar = () => console.log('saludos')
ejecutar(saludar)

const ejecutar2 = (unaFuncion,params) => unaFuncion(params)
const saludar2 = nombre => console.log(`saludos ${nombre}`)
ejecutar2(saludar2, 'matias')

//ej1

const operacion = (val1, val2, operacion) => {
    return operacion(val1,val2)
}

const suma = (n1,n2) => n1+n2;
const resta = (n1,n2) => n1-n2;
const multip = (n1,n2) => n1*n2;
const divi = (n1,n2) => n1/n2;
const resto = (n1,n2) => n1%n2;

console.log('suma: ' + operacion(2,6,suma))
console.log('resta: ' + operacion(2,6,resta))
console.log('multiplicacion: ' + operacion(2,6,multip))
console.log('division: ' + operacion(2,6,divi))
console.log('resto: ' + operacion(2,6,resto))
