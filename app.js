const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session =require('express-session');
const cookieParser =require ('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');

const users = []

const  app = express();
const port = 4000;

const passport = require('passport')
//   const flash = require('express-flash')
//   const session = require('express-session')
const methodOverride = require('method-override')
  
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
  
  
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())

app.use(session({
    secret:"secret",
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
  
app.get('/test', checkAuthenticated, (req, res) => {
    res.render('test.ejs', { name: req.user.name })
})
  
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
  
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))
  
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})
  
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})
  
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})
  
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/profile')
    }
    next()
}



require('dotenv').config();

app.use(express.urlencoded( { extended : true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('Secure'))
app.use(session({
    secret:"secret",
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/movieRoutes.js');
app.use('/',routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));
