var objects = {
  people: {},
  chats: {},
  questions: {},
  secret: 'ger234fsdd32efsd'
}

// Config and requirements.
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var twig = require('twig')
var express = require("express")
var fs = require('fs')

var app = express()
var port = 3000
var host = 'http://localhost:' + port

// Compiles compass on the fly, slows it down.
var compass = require('compass') 
app.use(compass({ cwd: __dirname + '/' }))

// Middleware.
app.configure(function() {
  app.use(express.static(__dirname + '/bower_components'))
  app.use(express.static(__dirname + '/public'))
  app.use(express.cookieParser())
  app.use(express.bodyParser())
  app.use(express.session({ secret: objects.secret }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(app.router)
})

// Include login logic.
eval(fs.readFileSync('scripts/login.js')+'')

// Include socket.io logic.
eval(fs.readFileSync('scripts/socket.js')+'')

// Index html.
app.get('/', function(req, res){
  res.render('index.twig')
})