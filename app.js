const express = require('express')
const app = express()
// load restaurant.json 
const restaurantList = require('./restaurant.json')

// set port number
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting root 
app.get('/', (req, res) => {
  res.render('index' , { restaurants : restaurantList.results})
})

// setting show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.restaurant_id))

  res.render('show', {restaurant: restaurant})
})

// setting search 
app.get('/search', (req, res) => {
  console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    // 前面是從name搜索, or後面則是從類別搜索
    return restaurant.name.toLowerCase().trim().includes(keyword.toLowerCase().trim()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants : restaurants , keyword : keyword })
})


// setting templete engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting listening
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

