const  express = require('express')
const bp = require('body-parser')
const cors = require('cors')

// Initiliazations
const app = express();
require('./database')
app.use(cors());

// Settings

app.set('port', process.env.PORT || 3001)


// Middlewares

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// Global Variables

// Routes

app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// Statics Files

// Server is listenning

app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
})


