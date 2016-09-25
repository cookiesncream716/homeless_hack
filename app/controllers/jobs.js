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
						if (result[i].available){
							active.push(result[i]);
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
			Job.update({_id: req.body.jobID},{
				'user': req.body.userID,
				'available': false,
				'employed': true
			}, function(err, response){
				if (err){
					console.log('update at ' + req.body.jobID + ' failed');
				}else{
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

					timeoutManager.addTimeout(result._id, elapsedTime, function(){
						
						Job.find({'_id': identifier}, function(err, result){
							
							if (!err && !result.employed){
								
								Job.remove({'_id': identifier}, function(err, result){
									
									if (err){
										console.log('err in delete', result_id, err);
									}else{
										console.log(identifier + " deleted");
									}
								});
							}
						});	
					})
				}
			});
		},

		getJobsForUser: function(req, res){
			var sort = req.params.sort;
			var city = req.params.city;
			var asc = req.params.asc;

			if (asc){
				sort = "-" + sort
			}

			Jobs.find({'city': city}).sort(sort).exec(function(err, result){
				if (err){
					console.log('err', err);
					res.json({'status': false});
				}else{
					res.json({'status': true, 'jobs': jobs});
				}
			});

		}
	}
})();