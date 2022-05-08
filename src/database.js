const mongoose = require('mongoose')

const url = "mongodb+srv://daniel:daniel123@prueba1.ugljf.mongodb.net/note-app?retryWrites=true&w=majority"

mongoose.connect(url)
    .then(db => console.log(' DB is connected'))
    .catch(err => console.log('Error', err))