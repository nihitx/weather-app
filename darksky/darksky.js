/* https://darksky.net/dev/account */
/* http request to darsky which a weather forcast api */
const request = require('request');

getTemp = (latlong, callback) => {
    var long = latlong.long;
    var lat = latlong.lat;

    /* calling google for getting lat lang of address */
  request({
  	url: `https://api.darksky.net/forecast/ebe0f0da8de3689c3fb19dc00ab5672f/${lat},${long}`,
  	json : true
    },(error, response, body) =>{
  	 if(!error && response.statusCode === 200) {
      callback(undefined, {
        /* you can get more info from body like apparent temp which is basically feels like temp */
        temperature : body.currently.temperature
      });
  	}else{
      callback('Unable to fetch weather');
    }
  });
}

module.exports = {
  getTemp
};
