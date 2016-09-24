var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var timeoutManager = require('./../managers/client_manager')

module.exports = (function(){
	return{
		getAll: function(req,res){
			Employer.find({'_employer': req.body._id}, function(err, result){
				if (err){
					console.log('err');
				}else{
					var active = [];
					var completed = [];

					for (var i = 0; i < result.length; i++){
						if (result[i].available){
							active.push(result[i]);
						}else if (result[i].completed){
							active.push(result[i].completed);
						}
					}

					res.json({'status': true, 'active': active, 'completed': completed});
				}
			})
		},

		create: function(req, res){
			var jobInfo = req.body;
			jobInfo.available = true;
			jobInfo.completed = false;
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
						Job.remove({'_id': identifier}, function(err, result){
							if (err){
								console.log('err in delete', result_id, err);
							}else{
								console.log(identifier + " deleted");
							}
						}));
					})
				}
			});
		}
	}
})();