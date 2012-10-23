/*
 * a center pool accept and buffers crawler requests, offer to fetcher later
 */
var HTTP = require('http');
var URL = require('url');
var UNIQ = require('./uniq');
var QUEUE = require('./queue');

var ip="172.18.218.28"
	,port=23456
	,base_url='http://'+ip+':'+port+'/'
	,ack_timeout=1000;

var uniq =UNIQ.create();
var uniq_waiting =UNIQ.create();
var queue = QUEUE.create();

//push the some crawl requests
function push(url_list){
	console.log(url_list);
	for(i in url_list){
		var url = url_list[i];
		if(uniq.push(url)){
			queue.push_back(url);
		}
	}
}

//pull some crawl requests, need to ack when crawl is finished, otherwise they will be back to pool again later(180s)
function pull(max_num){
	console.log(max_num);  
	urls = queue.pop(max_num);
	uniq_waiting.push(urls);
	setTimeout(function(){
		for(i in urls){
			var url = urls[i];
			if(uniq_waiting.pop(url)){
				queue.push_front(url);	
			}
		}	
	},ack_timeout);
	return urls;
}

//ack the pulled url have finished crawling
function ack(url_list){
	console.log(url_list);  
	for(i in url_list){
		var url = url_list[i];
		if(uniq_waiting.pop(url)){
			uniq.pop(url);
		}
	}	
}

var handles = {
		'/push':push
		,'/pull':pull
		,'/ack':ack
}

function setup_server(){
	var server = HTTP.createServer(function(request,response){
		var path = URL.parse(request.url).pathname;
		if(path in handles){
			response.writeHead(200,{'Content-Type':'text/plain'});
			request.setEncoding('utf-8');
			request.on('data',function(data){
				var value = handles[path](JSON.parse(data));
				if (value != null){ 
					response.write(JSON.stringify(value));
				}
				response.end();		
			});
		}else{
			response.writeHead(404,{'Content-Type':'text/plain'});
			response.write('404 not found');
			response.end();
		}
		console.dir(path);
		console.dir(request.method);
	});
	server.listen(port);
}





function test(){
	//var urls = ['www.baidu.com'];
	//post_data('http://172.18.218.28:12345/',urls);
	setup_server();
	console.log(handles['haha'] + ' ' + handles['/push'] + ' ' + ('haha' in handles));
}
test();

//exports.ack=ack;
//exports.push=push;
//exports.pull=pull;
