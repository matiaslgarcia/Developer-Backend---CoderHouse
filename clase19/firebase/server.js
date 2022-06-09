const admin = require("firebase-admin");

const serviceAccount = require('./db/coderhouse-backend-82fda-firebase-adminsdk-g7713-1f77e164fd.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase Conectado correctamente')

// createUser()
listUsers()
async function createUser(){
  const db = admin.firestore();
  const query = db.collection('usuarios')

   try {
     let id = 1;
     let doc = await query.doc(id.toString())
     await doc.create(
       {
         nombre: 'Matias',
         apellido: 'Garcia'
       })
     console.log('Usuario Creado')
   }catch (e) {
     console.log(e)
   }
 }

 async function listUsers(){
   const db = admin.firestore();
   const query = db.collection('usuarios')
    const allColors = await  query.get()
    allColors.forEach(colors => console.log(colors.data()))
 }

 async function updateUser(){
   const db = admin.firestore();
   const query = db.collection('usuarios')
   await query.doc()
 }