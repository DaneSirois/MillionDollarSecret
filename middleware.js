var express = require('express');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/milliondollarsecret";

module.exports = {
  getUsersIp: function (req, res, next) {
    var clientsIp = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log(clientsIp + " connected");
    req.clientsIp = clientsIp;
    next();
  },
  checkDatabaseForUser: function (req, res, next) {

    var clientsIp = req.clientsIp;

    MongoClient.connect(url, function(err, db) {

      if (err) {
        console.log("Unable to connect to DB");
      } else {
        console.log("Connected to Database");
        var userCollection = db.collection('users');

        userCollection.findOne({"ipAddress": clientsIp}, function(err, userObj) {
          if (userObj) {
            setReqParam(userObj);
          } else {
            console.log("User Not Found");
            setReqParam("nothing");
          }
        });

      }

      db.close()
    });

    var setReqParam = function (userObject) {
      return req.dog = userObject;
    };


    next();
  },
  createUserWithIp: function (req, res, next) {

    var clientsIp = req.clientsIp;
    var userObj = req.userObject;

    if (req.dog === "nothing") {
      console.log('hi');
      MongoClient.connect(url, function(err, db) {
        if (err) {
          console.log("Unable to connect to DB");
        } else {
          console.log("Connected to Database - Creating User:");
          var userCollection = db.collection('users');

          // Add the user to DB:
          userCollection.insert({"type": "user", "ipAddress": clientsIp, "hasPaid": "false"});

          // Set 'userObj' to the newly added user
          userCollection.findOne({"ipAddress": clientsIp}, function(err, userObj) {
            req.userObject = userObj;
            console.log("Created new user in DB: " + userObj);
          });
          db.close();
        }
      });

    } else { // If the user already exists:
      next();
    }
  }
};
