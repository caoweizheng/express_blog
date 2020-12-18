module.exports = {
  getToken: (jwt, name, time = 600) => {
    let token = jwt.sign({ username: name }, 'QWE_123', {
      'expiresIn': time
    })
    return token;
  }
}