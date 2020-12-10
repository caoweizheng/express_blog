const { ErrorModel } = require('../model/resModel')
module.exports.loginCheck = (req, res, next) => {
  if (!req.session.username) {
    res.json(
      new ErrorModel('尚未登录')
    )
    return;
  }
  next()
}