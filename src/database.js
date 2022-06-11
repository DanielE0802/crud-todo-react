const mongoose = require('mongoose')

const url = "mongodb+srv://daniel:daesra123@notes-app.o91vg.mongodb.net/Notes-app?retryWrites=true&w=majority"

mongoose.connect(url)
    .then(db => console.log(' DB is connected'))
    .catch(err => console.log('Error', err))