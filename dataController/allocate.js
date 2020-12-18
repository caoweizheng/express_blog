const { exec } = require('../db/mysql')
const getAllocateList = () => {
  let sql = 'select * from inventory_allocation_order limit 10, 20;'
  // if (author) {
  //   sql += `and author='${author}' `
  // }
  // if (keyWord) {
  //   sql += `and title like '%${keyWord}%' `
  // }
  // sql += `order by createtime desc;`
  // 返回的是promise
  return exec(sql)
}


module.exports = {
  getAllocateList,
}