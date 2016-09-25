var manager = {
	timeouts: {}
};

manager.addTimeout = function(name, expire, callback){
	if (name in timeouts){
		clearTimeout(timeouts[name])
		delete timeouts[name];
	}

	timeouts[name] = setTimeout(function(){
		callback()
	}, expire);
};

manager.removeTimeout = function(name){
	clearTimeout(timeouts[name]);
	delete timeouts[name];
};

module.exports = manager;