const jwt = require('jsonwebtoken')
const { ErrorModel } = require('../model/resModel')
const { getToken } = require('../utils')

module.exports.loginCheck = (req, res, next) => {
  let token = req.headers['access-token'];
  jwt.verify(token, 'QWE_123', (err, result) => {
    if (err) {
      res.json(
        new ErrorModel({
          username: req.session.username
        }, err.message, -2)
      )
    } else {
      res.setHeader('access-token', getToken(jwt, req.session.username));
      next();
    }
  })
}