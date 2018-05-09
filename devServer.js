const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const historyFallback = require('connect-history-api-fallback')
const morgan = require('morgan')
const freeport = require('getport')
const yargs = require('yargs')

const argv = yargs
  .option('port', {alias: 'p', default: 3000, type: 'number'})
  .option('search-free-port', {alias: 's', default: false, type: 'boolean'})
  .option('verbose', {alias: 'v', default: false, type: 'boolean'})
  .argv

const app = express()
const compiler = webpack(config)
const maxPort = argv['search-free-port'] ? 65535 : argv.port

const dashboard = new Dashboard()
compiler.apply(new DashboardPlugin(dashboard.setData))

if(argv.verbose){
  app.use(morgan('dev'))
}

app.use(historyFallback({verbose: argv.verbose, index: '/'}))

app.use(devMiddleware(compiler, {
  quiet: true,
  publicPath: config.output.publicPath
}))

app.use(hotMiddleware(compiler, {
  log: () => {}
}))

freeport(argv.port, maxPort, function(err, port){
  if(err){
    console.log(err)
    return
  }

  const server = app.listen(port, 'localhost', function(err){
    if(err){
      console.log(err)
      return
    }

    const address = server.address()
    console.log(`server listening on http://${address.address}:${address.port}`)
  })
})

