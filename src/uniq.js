



function uniq(){
	this.keys = {}
}

uniq.prototype.push = function (key){
	if(key instanceof Array){
		for(i in key)  this._do_push(key[i]);
	}else{
		return this._do_push(key);
	}
}


uniq.prototype._do_push = function (key){
	if(key in this.keys){
		return false;
	}else {
		this.keys[key]=1;
		return true;
	}
}

uniq.prototype.pop = function (key){
	if(key instanceof Array){
		for(i in key)
			this._do_pop(key[i]);
	}else{
		return this._do_pop(key);
	}
}
uniq.prototype._do_pop = function (key){
	if(key in this.keys){
		delete this.keys[key];
		return true;
	}
	return false;
}


function test(){
	var u = new uniq;
	console.log( u.push('1'));	
	console.log( u.push('1'));		
	console.log( u.push('2'));		
	console.log( u.pop('2'));
	console.log( u.push('2'));
}
//test();
exports.create=function(){
	return new uniq;
}
