class _AuthController {
  constructor(authService) {
    this.authService = authService
  }
  login(req, res) {
    const token = this.authService.login(req.body.username, req.body.password)
    res.status(200).send(token)
  }
  checkToken(req, res) {
    const isTokenValid = this.authService.authenticateToken(req.body.token)
    res.status(200).send(isTokenValid ? 'token good' : 'token invalid')
  }
}

function AuthController(authService) {
  return new _AuthController(authService)
}

module.exports = AuthController
