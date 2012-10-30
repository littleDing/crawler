var fs = require('fs')
function regMapper(){
	this.regs = []
}
regMapper.prototype.find=function(key){
	ret = []
	for(i in this.regs){
		reg = this.regs[i];
		if(reg.test(key)){
			ret.push(reg.source);
		}
	}	
	return ret;
}
regMapper.prototype.add=function(reg_string){
	this.regs.push(new RegExp(reg_string));
}

function data_walk(data){
	if(typeof(data)=='string'){
		ret = data;
		console.log('walking string ' + data);
		try{
			eval('ret='+data);
		}catch(exc) {
			console.log(exc);
			sp = data.split('.');
			if(sp.length==3 || sp.length==2){
				try{
					mod = sp.length==2 ? sp[0] : sp[0]+'.'+sp[1];
					console.log('loading module : ' + mod);
					mod = require(mod);
					ret = mod[sp[sp.length-1]];
				}catch(exc){
					console.log(exc);
				}
			}
		}
	}else{
		for(i in data){
			data[i] = data_walk(data[i]);
		}
		ret = data;
	}
	return ret;
}

function loadConfig(filename){
	var data = fs.readFileSync(filename).toString();
	data = JSON.parse(data);
	data = data_walk(data);
	return data;
}

function test(){
	console.log(loadConfig('config.fetcher.json'));
}
test();
exports.loadConfig=loadConfig;
exports.create=function(){
	return new regMapper();
}
