import transporter from '../utils/transporter.js'

const sendEMail = async(userNuevo) =>{
    await transporter.sendMail({
        from: userNuevo.email,
        to: 'AlexisMasin86@gmail.com',
        subject: "Nuevo Registro",
        html: `
            <h1>Nuevo Usuario Registrado</h1>
            <p><strong>Nombre:</strong> ${userNuevo.nombre} </p>
            <p><strong>Domicilio:</strong> ${userNuevo.direccion}</p>
            <p><strong>Edad:</strong> ${userNuevo.edad}</p>
            <p><strong>Telefono:</strong> ${userNuevo.telefono}</p>
            <p><strong>Email:</strong> ${userNuevo.email}</p>
            `
    })
}

export default sendEMail