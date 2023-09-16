const http = require('node:http')
const express = require('express')
const finalhandler = require('finalhandler')
const diContainer = require('./lib/diContainer')
const TOKEN_SECRET = '712378'

diContainer.register('dbName', 'class')
diContainer.register('tokenSecret', TOKEN_SECRET)
diContainer.factory('db', require('./lib/db'))
diContainer.factory('authService', require('./lib/authService'))
diContainer.factory('authController', require('./lib/authController'))

const authController = diContainer.get('authController')
console.log(diContainer)

const app = express()
app.use(express.json())

app.get('/ping', (req, res) => { throw new Error('stuff') })
app.post('/login', authController.login)
app.post('/check-token', authController.checkToken)

// return 404 if not found
app.all(() => finalhandler())

app.use((error, req, res, next) => {
  let done = finalhandler(req, res, { 
      // env: 'production',
      onerror: err => { console.error(err.message) }
    }
  )

  done(error)
})
http.createServer(app).listen(3000, () => console.log('Express server started'))
