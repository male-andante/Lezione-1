const express = require('express') // qui importo la libreria express
const cors = require('cors') 
const mongoose = require('mongoose'); // mi connetto al DB
const app = express() // qui creo un applicazione che si basa su express che deve restare sempre acceso pronto a rispondere alle richieste ajax.
const port = 3001 //importante che diverse applicazioni si aprano su porte diverse per poter essere eseguiti contemporaneamente.
const dbName = 'dbTest'


// Middleware di Express che mi permette di fare lo stringify di oggetti in json. In quesot modo Express lo fa per me ogni volte che se ne presenta l'occasione. Il middleware opera in mezzo tra la richiesta e la risposta.
app.use(express.json())
app.use(cors())

// let users = [
//     {id: 1, name: 'Mario', lastname: 'Rossi', email: 'm.rossi@example.com'},
//     {id: 2, name: 'Giovanni', lastname: 'Bianchi', email: 'g.bianchi@example.com'},
//     {id: 3, name: 'Mario', lastname: 'Rossi', email: 'm.rossi@example.com'}
// ]

const userSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    lastname: {type: 'string', required: true},
    email: {type: 'string', required: true}
})  // così definisco che forma deve avere il dato.

const userModel = mongoose.model('Users', userSchema) // creo una collection che si chiama Userse che ha forma userSchema ed è l'oggetto che mi permette id ocmunicare con il DB    

app.get('/', (req, res) => {  
  // res.send('Hello World!') a richiesta GET rispondi con 'Hello World!'
  res.json({message: 'App connessa'})
})

app.get('/users', async (req, res) =>{ // qui chiedo di rispondere con un json che è users
    const users = await userModel.find()
    res.status(200).json(users)
})

app.get('/users/:id', async (req, res)=>{ //per leggere dimanicamente il singolo id, lo metto come segnaposto :id
    const id = req.params.id  // definisco una variabile id che è dato dalla richiesta di leggere l'id presente nei parametri dell'oggetto.
    try{
        const user = await userModel.findById(id)
    //let obj = users.find(u => u.id == id) voglio prendere solo l'oggetto relativo all'id quindi find. solo == perché confronto numeri (u.id) e stringa (id)
    // let obj = users.find(u => u.id === Number(id)) meglio da un punto di vista di sicurezza.
   // let obj = users.find(u => u.id === +id)  // conversione veloce, molto + usato
    res.status(200).json(user)
}catch (error){
    res.status(500).json({error: error.message})
}}
)

app.post('/users', async (req, res)=>{
    const obj = req.body

    const newUser = new userModel(obj) //scrivo obj
    const dbUser = newUser.save() // salvo obj
    res.status(201).json(dbUser) // questo è quello che mi restituisce il server, cioè l'oggetto creato con il suo id.
})

async function start(){
    try{
        await mongoose.connect('mongodb+srv://andreadanteprivitera:AQZ32JWmHvwTwUTS@clustertest.em6rsgf.mongodb.net/'+ dbName) // metodo di connessione al DB.
        app.listen(port, () => {  // .listen è il metodo che accende il server su una porta.
           console.log(`Node app listening on port ${port}`)  // questo viene
         })
    } catch(error) {
        console.error(error)
    }
 
}

start()



