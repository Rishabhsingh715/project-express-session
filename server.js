const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const PORT = 4000;

const passport = require('passport');
const passportLocal = require('./config/passport-local');

const db = require('./config/mongoose');

const MongoStore = require('connect-mongo');

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 2;

//session middleware
app.use(sessions({
    name: 'dodo',
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/express_session_db',
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongo setup OK');
    })

}));

// parsing the incoming data
app.use(express.json());


//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//middleware     
app.use(express.urlencoded());
app.use(express.static('./assets'));
// cookie parser middleware
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./controllers/home.js') );

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));


