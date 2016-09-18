var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongo = require('mongodb');

// Import Middleware:
var middleware = require('./middleware.js');


var users = require('./routes/users');



var app = express();
var server = require('http').createServer(app);

app.set('port', (process.env.PORT || 8080));

app.use(express.static(path.join(__dirname, '/client')));       // set the static files location

app.use(favicon(__dirname + '/client/css/img/favicon.ico'));
app.use(logger('dev'));                         // log every request to the console
app.use(bodyParser.json());                          // pull information from html in POST
app.use(methodOverride());                      // simulate DELETE and PUT


// Initialize your routes:
require("./routes.js")(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/*
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

*/

server.listen(app.get('port'));

module.exports = {
  app: app
}
