/* this weather app has been created to learn on how async works, with callbacks of a function */
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const darksky = require('./darksky/darksky.js');

/* helps command line to get more info  hit --help to find out*/
const argv = yargs
	.options({
		a: {
			demand : true,
			alias : 'address',
			describe : 'Address to fetch weather for',
			string : true
		}
	})
	.help()
	.alias('help','h')
	.argv;

geocode.geocodeAddress(argv.address, (err, results) =>{
	if(err){
		console.log(err);
	}else{
		console.log(`Address you have entered is ${results.address} `)
		darksky.getTemp(results, (err, temp) => {
			if(err){
				console.log(err);
			}else{
				console.log(`The temp there is ${temp.temperature}`)
			}
		});
	}
});

// https://api.darksky.net/forecast/ebe0f0da8de3689c3fb19dc00ab5672f/37.8267,-122.4233
