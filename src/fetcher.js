var util = require('util'),events=require('events'),router=require('./router');
var fetchers = require('./fetchers');
function fetcher(config){
	console.log(config);
	this.router = router.create();
	for(i in config){
		c = config[i];
		p = c.pattern;
		h = c.handler;
		this.router.add(p);
		this.on(p,h);
	}
	this.on('__default_fetcher',fetchers.fetch);
}
util.inherits(fetcher,events.EventEmitter);
fetcher.prototype.run=function(pool){
	console.log('run with pool : '+pool + this.pool);
	this.pool = pool;
	setTimeout(this.do_run,10,this);	
}
fetcher.prototype.do_run=function(instance){ 
	instance.pool.pull(10,function(urls){
		for(i in urls){
			url = urls[i];
			patterns = instance.router.find(url);
			patterns.push('__default_fetcher');			 
			console.log('fetching url : ' + urls + ' of pattern : /'+patterns[0]+'/');
			instance.emit(patterns[0],url,function(html){
				instance.emit('data',url,html);
				instance.pool.ack([url]);
				setTimeout(instance.do_run,0,instance);
			});
		}
	});
}
exports.create=function(config){return new fetcher(config);}
