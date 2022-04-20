class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas
    }

    getFullName = () =>{
        return `El Usuario se llama ${this.nombre} ${this.apellido}`
    }

    addMascota = (nombreMascota) => {
        this.mascotas.push(nombreMascota)
    }

    countMascotas = () =>{
        return this.mascotas.length
    }

    addBook = (nombreLibro, autorLibro) => {
        this.libros.push({nombre: nombreLibro, autor: autorLibro})
    }

    getBookNames = () => {
        return this.libros.map(nameBook => nameBook.nombre)
    }
}

const libross = [
    {
        nombre: 'Vivir el camino',
        autor: 'Palermo',
    },
    {
        nombre:'Pasaje al Futuro',
        autor: 'Bilinkis',
    }
    ]
const unUsu = new Usuario('Matias','Garcia', libross, ['uhma', 'oli','peni'])

console.log(unUsu.getFullName())
unUsu.addMascota('pepito')
unUsu.addMascota('michi')
console.log('La cantidad de mascotas que tiene el usuario es: ' + unUsu.countMascotas())

unUsu.addBook('Inteligencia Emocional', 'Goleman')
unUsu.addBook('Los ojos del perro siberiano', 'Cortazar')
console.log(unUsu.libros)

console.log('Los nombres de los libros del usuario son: ', unUsu.getBookNames())