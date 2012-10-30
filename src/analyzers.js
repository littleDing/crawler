/*
 * extract infomations and urls need to crawl from html
 */

var $=require('jquery');

function extract_all_url(html){
	dom = $(html);
	urls = [];
	dom.find('[href]').each(function(){
		urls.push($(this).attr('href'));
	});
	return urls;
}

function test(){
	var fetcher = require('./fetcher')
	var html = fetcher.fetch('http://cis.sysu.edu.cn/',function(html){
		console.log(extract_all_url(html));				
	});
}

test();

