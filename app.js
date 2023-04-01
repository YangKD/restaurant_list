const express = require('express')
const exphbs = require('express-handlebars')
// load mongoose
const mongoose = require('mongoose')
// load restaurant.json 
const Restaurant = require('./models/restaurants')
const methodOverride = require('method-override')

// use dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// get connect state
const db = mongoose.connection
// connect error 
db.on('error', () => {
  console.log('mongodb error!')
})
// connect sucess
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000

// setting templete engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride("_method"))


// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
app.get('/search', (req, res) => {
  if (!req.query.keywords){
    res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data => 
          data.name.toLowerCase().includes(keyword) || 
          data.category.includes(keyword)
      )
      res.render('index', { restaurantsData: filterRestaurantsData, keywords })
    })
})

// 新增餐廳頁面
app.get("/restaurants/new", (req, res) => {
  res.render("new")
})


// 瀏覽特定餐廳
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantId  = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => { 
      res.render('show', { restaurantData })
    })
    .catch(error => console.log(error))
})


// 新增餐廳
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 編輯餐廳頁面
app.get("/restaurants/:restaurantId/edit", (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

// 更新餐廳
app.put("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
app.delete("/restaurants/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// setting listening
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

