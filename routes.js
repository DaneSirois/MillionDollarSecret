var express = require('express');
var middleware = require('./middleware.js');


module.exports = function(app) {
  app.get("/", function(req, res){
    res.sendfile('./index.html');
  }),
  app.get("/getUser", middleware.getUsersIp, middleware.checkDatabaseForUser, middleware.createUserWithIp, function(req, res) {
    res.json(req.userObject);
  })
};
