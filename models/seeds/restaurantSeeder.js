const mongoose = require('mongoose')
const Restaurant = require('../restaurants')
const restaurantList = require('../../restaurant.json').results
const db = require("../../configs/mongoose")

db.once('open', () => {
  console.log('mongodb connected!')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(err => {
      console.log(err)
    })
})