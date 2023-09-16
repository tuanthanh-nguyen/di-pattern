const { authenticateToken } = require('./authService')

try {
  console.log(authenticateToken('7123789'))
} catch (e) {
  console.log(e.message)
}
