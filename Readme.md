MERN

Node Js => installarlo
poi su terminale => node -v per la versione
con npm init mi installa un pacchetto json con varie robe rispondendo a delle domande

nom init -y => installa il package senza rispondere a domande

su Node andremo sempre sul terminale.

Ora installiamo Express Js => npm install express --save.

Questo crea delle dipendenze e dei node modules.


Lo metto nel mio file entrypoint.

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


Per eseguire node => node nomefile.js

per spegnere il server => control + C

fatto il serve, devo creare rotte


Quando devo fare una richista di POST, il server deve servirsi di cors. E queste cors devono poter essere usate soo da utenti abilitati. Sono anch'essi dei middleware.

installarle = > npm install cors

Installo ora il database NO SQL. Può essere installato in locale, poco utilizzato. Oppure lo uso tramite ATLAS, il suo cloud.

mongo db => https://www.mongodb.com/

installo mongo tramite compass o vscode.

stringa di connessione => mongodb+srv://andreadanteprivitera:<db_password>@clustertest.em6rsgf.mongodb.net/

per connettere il DB al progetto, mi serve Mongoose che è una sorta di connettore. => https://mongoosejs.com/

installo => npm install mongoose --save

una volta installato, ci metto la stringa di autenticazione concatenato col db a cui ho dato il nome.

Fatto questo metto tutto dentro una funzione asincrona per evitare che si accenda db ma non il server, e viceversa.

Poi creo uno schema della mia collezione di dati (json).


LEZIONE 2 - Query

Query per sort, skip e limit su un DB

Query comuni per la ricerca su MongoDB sono il findById e il find()

limit e skip sono query per la paginazione delle pagine web, 

esempio find(query).limit(100) => fammi vedere solo 100 record alla volta.

fin(query).sort(price: 1) => filtra per prezzo

MongoDB ha delle query native molto utili e usate per ricerche più complesse.

ATTENZIONE: In node.js NON ESISTE l'oggetto globale Window (che è quello che contiene fetch, alert, metodi, le funzioni...)

Per testare il server, vado su postman, poi creo una collection con dentro delle request. innanzitutto la getAll che è localhost:3001/users.

per la GetById, ma per il momento non posso far nulla perché non posso far nulla, ma posso gestire l'errore => localhost:3001/users/45728y

Per la POST creo una richiesta post e creo degli utenti tramite body => raw => json e creo il json utente per utente.

per la PUT come la post, ma l'oggetto deve essere quello letto dalla get, non postato.

per la DELETE come la getbyid


QUERY E PAGINAZIONE

mi creo degli endpoint e posso passare un id o tramite params o tramite query strings.






