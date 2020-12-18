const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// const { loginCheck } = require('../middleware/login-check')
const { getAllocateList } = require('../dataController/allocate')
const { SuccessModel, ErrorModel } = require('../model/resModel')


router.post('/shipmentList', async function (req, res, next) {
  const { pageNum, pageSize } = req.body
  const loginPromise = await getAllocateList()
  if(loginPromise) {
    res.json(
      new SuccessModel({
        pageSize,
        currentPageNum: pageNum,
        list: loginPromise,
        total: 21
      })
    )
  } else {
    res.json(new ErrorModel('sql error'))
  }
});

module.exports = router;
