var employer = require('./../controllers/employers.js');
var auth = require('./../controllers/auth.js');

module.exports = function(app){
	app.post('/login', function(req, res){
		if (req.body.type == 'employer'){
			employer.login(req, res);
		}
	});

	app.post('/register', function(req, res){
		if (req.body.type == 'employer'){
			employer.register(req, res);
		}
	});

	app.post('/userLogin', function(req, res){
		auth.userLog(req, res);
	});

	app.post('/userRegister', function(req, res){
		auth.userReg(req, res);
	});
}