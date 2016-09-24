var mongoose = require('mongoose');
var Employer = mongoose.model('Employer');
var timeoutManager = require('./../managers/client_manager')

module.exports = (function(){
	return{
		create: function(req,res){
			var employerInfo = req.body;
			
			var newEmployer = new Employer(employerInfo);
			newEmployer.save(function(err, result){
				if (err){
					console.log('err on new employer save');
				}else{
					res.json({'status': true, 'employer': result});
				}
			});
		}
	}
})();