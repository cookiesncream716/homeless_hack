var mongoose = require('mongoose');
var Employer = mongoose.model('Employer');

module.exports = (function(){
	return{
		create: function(req,res){
			var employerInfo = req.body;
		}
	}
})();