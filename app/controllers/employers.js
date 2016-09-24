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
		register: function(req,res){
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

			Employer.save().then(function(user){
				console.log('this is the user', user)
			});
		},

		login: function(req, res){
			var employer = req.body; 
			var filtemail = xssFilters.inHTMLData(employer.email);
			Employer.findOne({email : employer.email}, function(err, user){
				var verifyPassword = req.body.password; 
				if(!user){
					console.log(err);
					res.send({status:500, message: 'Sorry, the user account does not exist. Please check again!', type:'internal'});
				}
				else if(!isvalidPassword(req.body.password, user.password)){
					console.log(err);
					// err = "Incorrect password. Please check again!";
					res.send({status:500, message: 'Invalid password. Please check again!', type:'internal'});
					// res.json(err);
				}
			});
		},

		userLog: function(req, res){
			console.log('userLog in back AuthController');
			console.log(req.body);
		},

		userReg: function(req, res){
			console.log('userReg in back AuthController');
			console.log(req.body);
			var user = req.body;
			if(! req.body){}
		}
	}

})();