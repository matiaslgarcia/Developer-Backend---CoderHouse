class Cliente {
    constructor(nombre,fecha,direccion) {
        this.nombre = nombre;
        this.fechaNacimiento = fecha;
        this.direccion = direccion;
    }
}

const unCliente = new Cliente ('matias', '24/11/1994', 'Barrio la ribera')
console.log(unCliente)

class Contador {
    constructor(nombre) {
        this.nombre = nombre;
        this.conteo = 0
    }
     static conteoTotal = 0;

    obtenerResponsable = () => {
        return this.nombre
    }

    obtenerCuentaIndividual = () => {
        return this.conteo
    }

    obtenerCuentaGlobal = () => {
        return Contador.conteoTotal
    }
    contar = () =>{
        this.conteo++;
        Contador.conteoTotal++;
    }
}

const contador1 = new Contador('Matias')
const contador2 = new Contador('Belen')

contador1.contar()
contador1.contar()

contador2.contar()
contador2.contar()
contador2.contar()

// Obtener cuentas locales

console.log(`La cuenta de ${contador1.obtenerResponsable()} es de ${contador1.obtenerCuentaIndividual()}`)
console.log(`La cuenta de ${contador2.obtenerResponsable()} es de ${contador2.obtenerCuentaIndividual()}`)

// Obtener cuenta global desde la clase

console.log(`La cuenta de Global es de ${Contador.conteoTotal}`)

// Obtener cuenta global desde las instancias

console.log(`La cuenta de Global es de ${contador1.obtenerCuentaGlobal()}`)