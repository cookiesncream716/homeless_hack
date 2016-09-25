var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var timeoutManager = require('./../managers/timeoutManager')


module.exports = (function(){

	return{
		getEmployerJobs: function(req,res){
			console.log(req.params.id)
			Job.find({'_employer': req.params.id}, function(err, result){
				if (err){
					console.log('err');
				}else{
					console.log('found jobs', result)
					res.json(result)
				}
			})
		},

		acceptJob: function(req,res){
			console.log("THIS IS WHAT REQ.BODY LOOKS LIKE", req.body);
			Job.update({_id: req.body.job._id},{
				'_user': req.body.userID,
				'available': false,
				'employed': true
			}, function(err, response){
				if (err){
					console.log('update at ' + req.body.jobID + ' failed');
				}else{
					console.log(response)
					res.json({'status': true, 'result': response});
				}
			})
		},

		getCompletedJobs: function(req, res){
			Job.find({'_user': req.params.userID, 'completed': true}).populate('_employer').exec(function(err, jobs){
				if (!err){
					console.log("PREVIEW COMPLETED", jobs)
					jobs.createdAt = createDateAdded(jobs);
					res.json({'status': true, 'jobs': jobs});
				}
			})
		},

		create: function(req, res){
			console.log('in create jobs', req.body)
			var newJob = new Job(req.body);
			newJob.save(function(err, result){
				if(err){
					console.log("You got errors??", err);
				}else{
					console.log("Bring home the gravy");
					var now = Date(); 
					var elapsedTime = Math.abs(result.expiration - now);
					var identifier = result._id;


					console.log('finished')
					res.json(result);

				}
			});
		},
		completedJob: function(req, res){
			console.log('in jobs.js ' + req.params.id)
			Job.findOne({_id: req.params.id}, function(err, job){
				if(err){
					console.log('error finding job to update as completed', err)
					res.json(err)
				} else{
					console.log('found job', job)
					Job.update({_id: req.params.id}, {completed: true, employed: false, available: false}, function(err, product){
						res.json(product)
					})
				}
			})
		},
		getJobsForUser: function(req, res){
			var sort = req.params.sort;
			var city = req.params.city;
			var asc = req.params.asc;
			var userID = req.params.userID;
			var currentJob;

			console.log("THESE ARE THE PARAMS", sort, city, asc, userID);
			if (asc == '-'){
				sort = "-" + sort
			}

			Job.find({'city': city}).sort(sort).populate('_employer').exec(function(err, result){
				if (err){
					console.log('err', err);
					res.json({'status': false});
				}else{
					console.log(result._employer);
					var jobs = [];
					var info = {'status':true};
					for (var i = 0; i < result.length; i++){
						var job = result[i];
						job.dateAdded = createDateAdded(job);
						console.log("DOES THIS NOW HAVE DATE ADDED", job);
						job.createdAt = job.createdAt.toString().split('T')[0]

						console.log("JOB", job)
						if (job.employed && job._user == userID){
							info.currentJob = job;
							console.log("CURRENT JOB", job);
						}else{
							jobs.push(job);
						}

					}

					info.jobs = jobs;
					console.log("INFO", info);
					res.json(info);
				}
			});
		}

	}
})();

function createDateAdded(job){
	var date = new Date(job.createdAt);
	console.log('THIS WOULD BE DATE',date);
	return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
}