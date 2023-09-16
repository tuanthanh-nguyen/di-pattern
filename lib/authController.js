module.exports = function(authService) {
  let authController = {}

  authController.login = function(req, res) {
    const token = authService.login(req.body.username, req.body.password)
    res.status(200).send(token)
  }

  authController.checkToken = function(req, res) {
    const isTokenValid = authService.authenticateToken(req.body.token)
    res.status(200).send(isTokenValid ? 'token good' : 'token invalid')
}

  return authController
}
