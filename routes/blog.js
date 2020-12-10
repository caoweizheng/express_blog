const express = require('express')
const router = express.Router()
const { loginCheck } = require('../middleware/login-check')

router.get('/list', loginCheck, (req, res, next) => {
  res.json('list')
})

router.post('/create', loginCheck, (req, res, next) => {
  res.json('create')
})

module.exports = router