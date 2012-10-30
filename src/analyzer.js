var util = require('util'),events=require('events');
function analyzer(){
}
util.inherits(analyzer,events.EventEmitter);
analyzer.prototype.analyze=function(url,html){
	console('analying { url: '+ url+'\n html: \n'+html);
}
exports.create=function(){return new analyzer();}
