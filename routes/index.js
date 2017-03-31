var express = require('express');
var router = express.Router();
var passport = require('./auth.js');
var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');
var flash = require('connect-flash');
var users = mongoose.model('users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gamedrone' });
});

router.post('/userslogin', passport.authenticate('userlogin', {
    successRedirect : '/users/template',
    failureRedirect : '/users/login',
    failureFlash : true
}));









var createHash = function(password){
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function userValidate(req,res,next){
	//console.log(req.user);
	users.findOne(req.user,function(err, user) {
		if(user!=null){
			req.session.user = user;
			next();
		}
		else {
      		res.redirect('/');
		}
	});
}
module.exports = router;
