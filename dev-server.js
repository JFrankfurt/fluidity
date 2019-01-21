require('dotenv').config()
const express = require('express')
const APIRouter = require('./server/api')

const app = express()
app.set('port', process.env.PORT || 3000)

// dev config
const config = require('./webpack.config.js')
const hot = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const compiler = webpack(config)
const devOptions = { publicPath: config.output.publicPath }
app.use(webpackDevMiddleware(compiler, devOptions)).use(hot(compiler))

// normal server
app.use('/api/', APIRouter)

app.listen(app.get('port'), () =>
  console.log('dev server running on port', app.get('port'))
)
