var mongoose = require('mongoose');
var Employer = mongoose.model('Employer');
var timeoutManager = require('./../managers/timeoutManager.js')
var jwt = require('jsonwebtoken');
var jwtSecret = 'aasjidfjiodsjfiosajfs';
var bCrypt = require('bcrypt-nodejs');
var xssFilters = require('xss-filters');

var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// using bcrypt to check passwords at login
var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

module.exports = (function(){
	return{
				register: function(req, res){

			var employer = req.body
			if(!employer.email || !employer.password){
				console.log('sending 400 message');
		        return res.status(400).end('Must fill out all fields');
			}
			var filtemail = xssFilters.inHTMLData(employer.email);
			var filtpassword = xssFilters.inHTMLData(employer.password);
			var new_employer = new Employer({
				email: filtemail, 
				password: createHash(filtpassword)
			});
			new_employer.save().then(function(user){
				console.log('this is the user', user)
			}) 
			var token = jwt.sign({
				_id: user._id,
				email: user.email,
			}, jwtSecret);
			console.log('this is the token:', token);
			res.send({
				token: token,
				user: {
					_id: user._id, 
					email: user.email, 
					logged_in: true}
			});
		}, 
		login: function(req, res){
			var employer = req.body; 
			var filtemail = xssFilters.inHTMLData(employer.email);
			Employer.findOne({email : employer.email}, function(err, user){
				console.log(user);
				var verifyPassword = req.body.password; 
				if(!user){
					console.log('there is an error', err);
					res.send({status:500, message: 'Sorry, the user account does not exist. Please check again!', type:'internal'});
				}
				else if(!isValidPassword(user, employer.password)){
					console.log('there is an error', err);
					// err = "Incorrect password. Please check again!";
					res.send({status:500, message: 'Invalid password. Please check again!', type:'internal'});
				}
				else{
					console.log('user is successfully logged in')
					var token = jwt.sign({
						_id: user._id,
						email: user.email,
					}, jwtSecret);
					console.log('this is the token:', token);
					res.send({
						token: token,
						user: {
							_id: user._id, 
							email: user.email, 
							logged_in: true}
					});
				}

			})

		},
		userLog: function(req, res){
			console.log('userLog in back AuthController');
			console.log(req.body);
			var user = req.body;
			User.findOne({username: user.username}, function(err, user1){
				var verifyPassword = user.password;
				if(!user1){
					console.log('error finding user', err);
					res.send({status: 500, message: 'Sorry, the user account does not exist. Please check again.', type: 'internal'});
				} else if(!isValidPassword(user1, user.password)){
					console.log(err);
					res.send({status:500, message:'Invalid password. Please try again.', type:'internal'});
				} else{
					console.log('user successfully logged in')
					var token = jwt.sign({
						_id: user1._id,
						username: user1.username
					}, jwtSecret);
					console.log('this is the user token:', token);
					res.send({
						token: token,
						user: {
							_id: user1._id,
							username: user1.username,
							logged_in: true
						}
					});
				}

			})
		},
		userReg: function(req, res){
			console.log('userReg in back AuthController');
			console.log(req.body);
			var user = req.body;

			if(!user.username || !user.password || !user.city || !user.name){
				console.log('user did not complete enough fields')
				return res.status(400).end('Must fill out username, password, city and name');
			}
			// var filtemail = xssFilters.inHTMLData(user.email);
			var filtpassword = xssFilters.inHTMLData(user.password);
			var new_user = new User({
				// email: filtemail, 
				password: createHash(filtpassword)
			});
			new_user.save().then(function(user){
				console.log('this is the user', user)
			})
			var token = jwt.sign({
				_id: user._id,
				username: user.username
			}, jwtSecret);
			console.log('this is the user token:', token);
			res.send({
				token: token,
				user: {
					_id: user._id,
					username: user.username,
					loggen_in: true
				}
			});


		}
	}


})();