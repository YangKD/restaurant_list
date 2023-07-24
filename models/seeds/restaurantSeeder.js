const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const db = require('../../configs/mongoose')
const Restaurant = require('../restaurants')
const RestaurantList = require('../../restaurant.json').results

const SEED_USER = [
  {
    name: 'USER1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'USER2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  // 使用map => seedUsers
  return Promise.all(Array.from(SEED_USER, (seedUser, index) => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => Restaurant.create({ ...RestaurantList[index * 3 + i], userId })
        ))
      })
  }))
  .then(() => {
    console.log('done.')
    process.exit()
  })
})