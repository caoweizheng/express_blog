class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this[key] = data[key];
        }
      }
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message, code = -1) {
    super(data, message)
    this.code = code
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}