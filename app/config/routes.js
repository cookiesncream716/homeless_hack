var employer = require('./../controllers/employers.js');
var auth = require('./../controllers/auth.js');

module.exports = function(app){
	app.post('/login:type', function(req, res){
		if (type == 'employer'){
			employer.login(req, res);
		}
	});

	app.post('/register:type', function(req, res){
		if (type == 'employer'){
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