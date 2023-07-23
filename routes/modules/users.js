const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 確保所有欄位都填
  if (!email || !password || !confirmPassword){
    errors.push({ message: '除名字以外,所有欄位都必填' })
  }
  // 確保密碼輸入正確
  if (password !== confirmPassword){
    errors.push({ message: '密碼與確認密碼不相符!' })
  }
  // 如果errors裡有東西,則輸出
  if (errors.length){
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash  // 用雜湊後的值取代原來的密碼
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) =>{
  req.logout()
  req.flash('success_msg', '你已經成功登出.')
  res.redirect('/users/login')
})

module.exports = router