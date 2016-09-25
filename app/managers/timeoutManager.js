var manager = {
	timeouts: {}
};

manager.addTimeout = function(name, expire, callback){
	if (name in this.timeouts){
		clearTimeout(this.timeouts[name])
		delete this.timeouts[name];
	}

	this.timeouts[name] = setTimeout(function(){
		callback()
	}, expire);
};

manager.removeTimeout = function(name){
	clearTimeout(this.timeouts[name]);
	delete this.timeouts[name];
};

module.exports = manager;