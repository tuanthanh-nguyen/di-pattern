const http = require('node:http')
const express = require('express')
const finalhandler = require('finalhandler')
const dbFactory = require('./lib/db')
const authServiceFactory = require('./lib/authService')
const authControllerFactory = require('./lib/authController')
const TOKEN_SECRET = '123456'

const db = dbFactory('class')
const authService = authServiceFactory(db, TOKEN_SECRET)
const authController = authControllerFactory(authService)

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
