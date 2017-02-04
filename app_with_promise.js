/* extra require is axios npm */
const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

/* axious works with process and you can use .then */
axios.get(geoCodeUrl).then((response)=>{
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find the address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var long = response.data.results[0].geometry.location.lng;
var weatherUrl = `https://api.darksky.net/forecast/ebe0f0da8de3689c3fb19dc00ab5672f/${lat},${long}`;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl);
}).then((response)=> {
	var temperature = response.data.currently.temperature;
	var aptTemp = response.data.currently.apparentTemperature;
	console.log(`its ${temperature} but feels like ${aptTemp}`);
}).catch((e)=> {
	if(e.code ==='ENOTFOUND'){
		console.log('Unable to connect to Map Sever');
	}else{
		console.log(e.message);
	}

});
