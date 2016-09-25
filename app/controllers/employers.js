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
			var filtcity = xssFilters.inHTMLData(employer.city);
			var filtzipCode = xssFilters.inHTMLData(employer.zipCode);
			var filtstreet = xssFilters.inHTMLData(employer.street);
			var filtname = xssFilters.inHTMLData(employer.name);
			var new_employer = new Employer({
				email: filtemail, 
				password: createHash(filtpassword), 
				city: filtcity, 
				zipCode: filtzipCode, 
				street: filtstreet, 
				name: filtname
			});
			console.log(new_employer)
			new_employer.save().then(function(user){
				console.log('this is the business', user)
				var token = jwt.sign({
					_id: user._id,
					email: user.email,
					name: user.name
				}, jwtSecret);
				console.log('this is the token:', token);
				res.send({
					token: token,
					user: {
						_id: user._id, 
						email: user.email, 
						logged_in: true}
				});
			}) 
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
					console.log('business is successfully logged in')
					var token = jwt.sign({
						_id: user._id,
						email: user.email,
						name: user.name
					}, jwtSecret);
					console.log('this is the token:', token);
					res.send({
						token: token,
						user: {
							_id: user._id, 
							email: user.email,
							name: user.name,
							logged_in: true}
					});
				}

			})

		}

	}


})();