class _AuthService {
  constructor(db, tokenSecret) {
    this.db = db
    this.tokenSecret = tokenSecret
  }
  login(username, password) {
    // authenticate
    const user = db.prepare('\
      SELECT username, password \
      FROM user \
      WHERE username = ? AND password = ?'
    ).get([username, password])  
    if (!user) return 'user not found'

    // set new token for user
    // TODO: this should be random generated
    const token = '712378'
    db.prepare('\
      UPDATE user \
      SET token = ? \
      WHERE username = ? AND password = ?'
    ).run([token, username, password])
    return { token }
  }
  authenticateToken(token) {
    // TODO: for now we retrieve token from database
    // we should check the against the secret token
    if (tokenSecret) return true
    const user = db.prepare('\
      SELECT username \
      FROM user \
      WHERE token = ?'
    ).get(token)
    if (!user) return false
    return true
  }
}

function AuthService(db, tokenSecret) {
  return new _AuthService(db, tokenSecret)
}

module.exports = AuthService
