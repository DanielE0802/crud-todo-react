const  express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require("cookie-parser");

// Initiliazations
const app = express();
require('./database');
require('./config/passport');
require('./config/passport');

// Settings

app.set('port', process.env.PORT || 3001);


// Middlewares

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors());

app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());

// Global Variables

// Routes

app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// Statics Files

// Server is listenning

app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
})



