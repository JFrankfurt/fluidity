require('dotenv').config({})
const express = require('express')
const APIRouter = require('./api')
const port = process.env.PORT || 8000

const app = express()
app.set('port', port)
app.use('/api/', APIRouter)
app.listen(app.get('port'), () =>
  console.log('listening on port', app.get('port'))
)
