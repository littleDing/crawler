var fs = require('fs');
function main(){
	var pool = require('./pool').create()
		,fetcher = require('./fetcher').create()
		,analyzer = require('./analyzer').create();
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
