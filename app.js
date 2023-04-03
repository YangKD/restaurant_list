const express = require('express')
const exphbs = require('express-handlebars')
// load restaurant.json 
const Restaurant = require('./models/restaurants')
const methodOverride = require('method-override')
const routes = require("./routes")
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
// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride("_method"))
app.use(routes)

// setting listening
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

