var fs = require('fs');
var loadConfig = require('./router').loadConfig;
var fetchers = require('./fetchers');
function main(){
	var pool = require('./pool').create()
		,fetcher = require('./fetcher').create(loadConfig('./config.fetcher.json'))
		,analyzer = require('./analyzer').create(loadConfig('./config.analyzer.json'));
	fetcher.on('data',analyzer.analyze);
	seeds = []
	process.argv.forEach(function(val,index){
		if(index<=1) return ;
		console.log('seeding : ' + val);					
		data = fs.readFileSync(val).toString().split(/\s+/);
		console.log(data);
		for(i in data){
			if(data[i].length>0){
				seeds.push(data[i]);
			}
		}
	});
	pool.push(seeds);
	fetcher.run(pool);
}
main();
