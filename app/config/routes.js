var auth = require('./../controllers/authController.js');

module.exports = function(app){
	app.post('/login', function(req, res){
		console.log('made it to the post route!')
		auth.register(req, res);
	})
	app.post('/register', function(req, res){
		console.log('made it to the post route!')
		auth.register(req, res);
	})
	app.post('/userLogin', function(req, res){

	})
	app.post('/userRegister', function(req, res){
		
	})


}