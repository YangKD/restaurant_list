const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/restaurants")


// 新增餐廳頁面
router.get("/new", (req, res) => {
  res.render("new")
})


// 瀏覽特定餐廳
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const restaurantId  = req.params.restaurantId
  return Restaurant.findOne({ restaurantId, userId })
    .lean()
    .then(restaurantData => { 
      res.render('show', { restaurantData })
    })
    .catch(error => console.log(error))
})


// 新增餐廳
router.post("/", (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 編輯餐廳頁面
router.get("/:restaurantId/edit", (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.restaurantId
  return Restaurant.findOne({ restaurantId, userId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

// 更新餐廳
router.put("/:restaurantId", (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.restaurantId
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findOne({ restaurantId, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
router.delete("/:restaurantId", (req, res) => {
  const userId = req.user._id
  const restaurantId = req.params.restaurantId
  return Restaurant.findOne({ restaurantId, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router