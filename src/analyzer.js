var util = require('util'),events=require('events');
function analyzer(){
}
util.inherits(analyzer,events.EventEmitter);
analyzer.prototype.analyze=function(url,html){
	console.log('analying { url: '+ url+'\n html: \n'+html + ' }');
}
exports.create=function(config){return new analyzer(config);}
