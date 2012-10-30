var util = require('util'),events=require('events');
function fetcher(){
	this.pool = null;
}
util.inherits(fetcher,events.EventEmitter);
fetcher.prototype.run=function(pool){
	console.log('run with pool : '+pool + this.pool);
	this.pool = pool;
	setTimeout(this.do_run,10,this);	
}
fetcher.prototype.do_run=function(instance){ 
	instance.pool.pull(1,function(urls){
		console.log(urls);
		instance.pool.ack(urls);
	});
	console.log('running');	
}
exports.create=function(){return new fetcher();}
