var express = require('express');
var router = express.Router();
var passport = require('./auth.js');
var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');
var fs = require('fs');
var flash = require('connect-flash');
var users = mongoose.model('users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  if(!req.user)
  {
   //  res.flash('error','Please sign in');
     res.render('login.html',{error : req.flash('error') , success : req.flash('success')} );
   }
  else    res.redirect('/users/template');
});
router.get('/index', function(req, res, next) {
  res.render('users/index');
});
router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy()
  res.redirect('/');
});
router.get('/template', function(req, res, next) {
  console.log(req.session);
  res.render('template.html',{ username : req.user.nick});
});
module.exports = router;
/*
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
router.post('/auth', function(req, res, next) {
  //res.send('success');
    var usern = req.body.username;
    var passw = req.body.password;
        
    users.findOne({first_name: usern},function(err,user){
      if(!user)
      {
         request.get('http://172.16.86.222:13000/login?nick='+usern+'&password='+passw+'&secret=qwerty', 
            function(err,response,body)
            {
          body=JSON.parse(body);
          if(body.error){
              //return res.redirect('/users/login');
              res.render('login',{message:"password did not match"});
            } 
          else {
            var user = new users({
              first_name:usern,
              password:createHash(passw),

            });
            user.save(function(err,user){
              if(err)
                {console.log(err);}
              else
                  res.send("found");
            });
          } 
          });
        //});
       }
      });


});*/








/* request.get('http://172.16.86.222:13000/login?nick='+usern+'&password='+passw+'&secret=qwerty', 
      function (error, response, body) 
      {
             body=JSON.parse(body);
            if(body.error)
            {
           // return console.log('Error:', error);
            //  res.send(body);
              users.findOne({_id:usern},function(err,user){
              if(!user)
              {
                return res.redirect('/users/login');
              }
                
            });
          //  res.render('login',{message : body.error});
           }
            else 
            {
              res.send(body.fullname);
            }
       
        // console.log(body);

});
        /*if (usern=='subham' && passw== 'asd') {
               // do something here with a valid login
                res.send(' logged in successfully');
        } else {
               // res.send('password did not match'); 
               res.render('login',{message:"password did not match"});
        }*/
