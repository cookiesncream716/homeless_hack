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
					// var available = [];
					// var completed = [];
					// var employed = [];

					// for (var i = 0; i < result.length; i++){
					// 	if (result[i].available){
					// 		active.push(result[i]);
					// 	}else if (result[i].completed){
					// 		active.push(result[i].completed);
					// 	}else if (result[i].employed){
					// 		active.push(result[i].employed);
					// 	}
					// }
					res.json(result)
					// res.json({'status': true, 'available': available, 'completed': completed, 'employed': employed});
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
			console.log('in create jobs', req.body)
			// var jobInfo = req.body;
			// jobInfo.available = true;
			// jobInfo.completed = false;
			// jobInfo.employed = false;
			// jobInfo.reference_states = false;

			var newJob = new Job(req.body);
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
					// })
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
		}
	}
})();