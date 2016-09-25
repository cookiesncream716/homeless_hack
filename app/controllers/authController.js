var mongoose = require('mongoose');
var Employer = mongoose.model('Employer');
var User = mongoose.model('User');
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
		userLog: function(req, res){
			console.log('userLog in back AuthController');
			console.log(req.body);
			var user = req.body;
			User.findOne({username: user.username}, function(err, user1){
				var verifyPassword = user.password;
				if(!user1){
					console.log('error finding user', err);
					res.send({status: 500, message: 'Sorry, the user account does not exist. Please check again.', type: 'internal'});
				}else if(!isValidPassword(user1, user.password)){
					console.log('whatttlkjwer',err);
					res.send({status:500, message:'Invalid password. Please try again.', type:'internal'});
				}else{
					console.log('user successfully logged in')
					var token = jwt.sign({
						_id: user1._id,
						username: user1.username
					}, jwtSecret);

					res.send({
						token: token,
						user: {
							_id: user1._id,
							username: user1.username,
							city: user1.city,
							zipCode: user1.zipCode,
							logged_in: true
						}
					});
				}

			});
		},
		userReg: function(req, res){
			console.log('userReg in back AuthController');
			console.log(req.body);
			var user = req.body;

			if(!user.username || !user.password || !user.city || !user.name){
				console.log('user did not complete enough fields')
				return res.status(400).end('Must fill out username, password, city and name');
			}
			var filtpassword = xssFilters.inHTMLData(user.password);
			var new_user = new User({
				name: user.name,
				username: user.username,
				city: user.city,
				zipCode: user.zipCode, 
				password: createHash(filtpassword)
			});

			new_user.save().then(function(savedUser){
				console.log('this is the user', savedUser);

				var token = jwt.sign({
					_id: savedUser._id,
					username: savedUser.username
				}, jwtSecret);
				console.log('this is the user token:', token);
				res.send({
					token: token,
					user: {
						_id: savedUser._id,
						username: savedUser.username,
						city: savedUser.city,
						zipCode: savedUser.zipCode,
						loggen_in: true
					}
				});
			})

		}
	}
})();



