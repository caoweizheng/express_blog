var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

// const { loginCheck } = require('../middleware/login-check')
const { login } = require('../dataController/user')
const { getToken } = require('../utils')
const { SuccessModel, ErrorModel } = require('../model/resModel')


router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    res.json(new ErrorModel('请输入用户名或密码'))
  }
  const loginPromise = login(username, password)
  if (loginPromise) {
    loginPromise.then(result => {
      if (result.username) {
        // // 保存登录状态到redis
        // redisHandle.set(req.userId, result)
        req.session.username = result.username;
        let token = getToken(jwt, { username: result.username })
        console.log('token:', token)
        res.json(new SuccessModel({
          username: result.username,
          token: token
        }))
        return;
      }
      res.json(new ErrorModel('登录失败，用户名或密码错误'))
    })
  }
});

module.exports = router;
