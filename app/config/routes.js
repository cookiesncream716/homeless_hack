var employers = require('./../controllers/employers.js');
var auth = require('./../controllers/authController.js');
var jobs = require('./../controllers/jobs.js');

module.exports = function(app){
	app.post('/login', function(req, res){
		if (req.body.type == 'employer'){
			employers.login(req, res);
		}
	});

	app.post('/register', function(req, res){
		if (req.body.type == 'employer'){
			employers.register(req, res);
		}
	});

	app.post('/userLogin', function(req, res){
		auth.userLog(req, res);
	});

	app.post('/userRegister', function(req, res){
		auth.userReg(req, res);

	});
	app.post('/jobs', function(req, res){
		console.log('in routes')
		jobs.create(req, res);
	})

	app.get('/jobsForUser/:userID/:city/:sort/:asc/', function(req, res){
		jobs.getJobsForUser(req, res);
	});

	app.post('/acceptJob', function(req, res){
		jobs.acceptJob(req, res);
	});
}