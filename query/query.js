const express = require('express') // qui importo la libreria express
const cors = require('cors') 
const mongoose = require('mongoose'); // mi connetto al DB



const app = express() // qui creo un applicazione che si basa su express che deve restare sempre acceso pronto a rispondere alle richieste ajax.
const port = 3001 //importante che diverse applicazioni si aprano su porte diverse per poter essere eseguiti contemporaneamente.
const dbName = 'dbQuery'
const dbPassword = 'AQZ32JWmHvwTwUTS'
const mongoString = 'mongodb+srv://andreadanteprivitera:AQZ32JWmHvwTwUTS@clustertest.em6rsgf.mongodb.net/'

// Middleware
app.use(express.json())
app.use(cors())

//Definizione modello dato del DB
const userSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    lastname: {type: 'string', required: true},
    phone: {type: 'number', required: true},
    email: {type: 'string', required: true}
})  // così definisco che forma deve avere il dato.

const userModel = mongoose.model('Users', userSchema) // creo un oggetto che collego a una collection che si chiama Users che ha forma userSchema   

// ora le rotte per la CRUD

//GET
app.get('/users', async (req, res) =>{ // qui chiedo di rispondere con un json che è users
    const users = await userModel.find() //così leggo tutto gestendo i tempi di attesa del DB
    res.status(200).json(users) // se va tutto bene, quindi 200, gli do i dati richiesti
})


app.get('/users/:id', async (req, res)=>{ //per leggere dimanicamente il singolo id, lo metto come segnaposto :id
    const id = req.params.id  // definisco una variabile id che è dato dalla richiesta di leggere l'id presente nei parametri dell'oggetto.
    try{
        const user = await userModel.findById(id) // cercami un oggetto che ha come Id => id
        res.status(200).json(user)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})

//POST
app.post('/users', async (req, res)=>{
    const obj = req.body  // definisco un oggetto che è il body che richiedo al DB
    const user = new userModel(obj) // dico che lo user è l'oggetto con modello useModel
    const dbUser = await user.save() // salvo quello che ho creato nel mio database
    res.status(201).json(dbUser)
})

//PUT
app.put('/users/:id', async (req, res)=>{
    const id = req.params.id
    const obj = req.body
    try{
        const userUpdate = await userModel.findByIdAndUpdate(id, obj)
        res.status(200).json(userUpdate)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

//DELETE
app.delete('users/:id', async(req, res)=>{
    const id = req.params.id
    try{
        await userModel.findByIdAndDelete(id)
        res.status(200).json(message = 'utente cancellato')
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})


//Funzione asincrona di connessione al database
async function connectDB(){
    try{
        await mongoose.connect(mongoString + dbName) // metodo di connessione al DB.
        app.listen(port, () => {  // .listen è il metodo che accende il server su una porta.
           console.log(`Node app listening on port ${port}`)  // questo viene
         })
    } catch(err) {
        console.error(err)
    }
 
}

connectDB()
