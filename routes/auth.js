/*var express = require('express');
var router = express.Router();
router.post('/auth', function(req, res, next) {
  //res.send('success');
        var usern = req.body.username;
        var passw = req.body.password;
       // console.log(req.body.username);
       // var url="http://172.16.86.222:13000/login?usern=123&passw=123456&secret=qwerty";
        if (usern=='subham' && passw== 'asd') {
               // do something here with a valid login
                res.send(' logged in successfully');
        } else {
               // res.send('password did not match'); 
               res.render('login',{message:"password did not match"});
        }
});

module.exports = router;*/


var passport = require('passport'),
    LocalStrategy   = require('passport-local').Strategy;
//var express = require('express');    
var request = require('request');
var mongoose = require('mongoose');
var users = mongoose.model('users');
var bCrypt = require('bcrypt-nodejs');
var fs = require('fs');
//var router = express.Router();

// User
passport.serializeUser(function(user, done) {
        console.log('serializing user..');
        done(null, user.nick);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  users.findOne({'nick' : obj } , function(err, user) {
        done(err, user);
    });
 // done(null, obj);
});

passport.use('userlogin',new LocalStrategy(
    function(username, password, done) { 
        users.findOne({ 'nick' :  username },function(err, user) {
                if (err)
                    return done(err);
                else if(!user){
                 request.get('http://172.16.86.222:13000/login?nick='+username+'&password='+password+'&secret=qwerty', function(err,response,body) {
                       body=JSON.parse(body);
                       if (err) {
                          console.log(err);
                          return done(null, false, { message: 'some internal error has occurred' });   
                       }
                       else {
                        if(body.error && body.error.length > 0){
              //return res.redirect('/users/login');
                           // res.render('login',{message:"password did not match"});
                           return done(null, false, { message: 'Incorrect Username/Password. Please try again.' });   
                           } 
                       else {
                        var user = new users({
                          nick: body.nick,
                          password: (password)

                              });
                            user.save(function(err,user){
                                    if(err)
                                      {
                                        console.log(err);
                                          return done(null, false, { message: 'Database error' });  
                                      }
                                   // else res.send("found");
                                   return done(null,user);
                             });
                            
                            } 
                        }
          });
        //});
       }
              else  if (!isValidPassword(user, password)){
                    return done(null, false, { message: 'Incorrect Password. Please try again.' });
                }
               else
                return done(null, user);
            }
        );

    })
);
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

module.exports = passport;
