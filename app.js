const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
// load restaurant.json 
const Restaurant = require('./models/restaurants')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require("./routes")

const usePassport = require('./configs/passport')
require("./configs/mongoose")

// use dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

// setting templete engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride("_method"))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

// setting listening
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

