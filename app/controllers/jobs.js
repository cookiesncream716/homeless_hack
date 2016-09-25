var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var timeoutManager = require('./../managers/timeoutManager')

module.exports = (function(){
	return{
		getEmployerJobs: function(req,res){
			Job.find({'_employer': req.body._id}, function(err, result){
				if (err){
					console.log('err');
				}else{
					var available = [];
					var completed = [];
					var employed = [];

					for (var i = 0; i < result.length; i++){
						console.log("THIS IS RESULT", result[i])
						if (result[i].available){
							available.push(result[i]);
						}else if (result[i].completed){
							active.push(result[i].completed);
						}else if (result[i].employed){
							active.push(result[i].employed);
						}
					}

					res.json({'status': true, 'available': available, 'completed': completed, 'employed': employed});
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

		create: function(req, res){
			var jobInfo = req.body;
			jobInfo.available = true;
			jobInfo.completed = false;
			jobInfo.employed = false;
			jobInfo.reference_states = false;

			var newJob = new Job(jobInfo);
			newJob.save(function(err, result){
				if(err){
					console.log("You got errors??", err);
				}else{
					console.log("Bring home the gravy");
					var now = Date(); 
					var elapsedTime = Math.abs(result.expiration - now);
					var identifier = result._id;

					// timeoutManager.addTimeout(result._id, elapsedTime, function(){
						
					// 	Job.find({'_id': identifier}, function(err, result){
							
					// 		if (!err && !result.employed){
								
					// 			Job.remove({'_id': identifier}, function(err, result){
									
					// 				if (err){
					// 					console.log('err in delete', result_id, err);
					// 				}else{
					// 					console.log(identifier + " deleted");
					// 				}
					// 			});
					// 		}
					// 	});	
					// });
					console.log('finished')
					res.json(result);

				}
			});
		},

		getJobsForUser: function(req, res){
			var sort = req.params.sort;
			var city = req.params.city;
			var asc = req.params.asc;
			var userID = req.params.userID;
			var currentJob;

			console.log("THESE ARE THE PARAMS", sort, city, asc, userID);
			if (asc == '+'){
				sort = "-" + sort
			}

			Job.find({'city': city}).sort(sort).exec(function(err, result){
				if (err){
					console.log('err', err);
					res.json({'status': false});
				}else{
					var jobs = [];
					var info = {'status':true};
					for (var i = 0; i < result.length; i++){
						var job = result[i];
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