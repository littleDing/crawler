/*
 * fetcher a requested url to html
 */
var HTTP = require('http');
var URL = require('url');

function fetch(url,callback){
	var option = URL.parse(url);
	var req = HTTP.request(option,function(res){
		res.on('data',function(buff){
			callback(buff.toString());
		});
	});
	req.setHeader('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4');
	req.end();
}

function test(){
	fetch('http://localhost:8977/');
	//fetch('http://localhost/',console.log);
	//fetch('http://www.baidu.com/',console.log);
}

exports.fetch=fetch;
test();
