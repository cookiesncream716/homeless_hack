var auth = require('./../controllers/authController.js');

module.exports = function(app){
	app.post('/login', function(req, res){

		auth.login(req, res);
	})
	app.post('/register', function(req, res){

		auth.register(req, res);
	})

	app.post('/userLogin', function(req, res){
		auth.userLog(req, res);
	})
	app.post('/userRegister', function(req, res){
		auth.userReg(req, res);
	})
}