/* http request */
const request = require('request');

/* adding callback to learn on how a function recieves the result back or an error
 * telling app.js that to call a function but it does not need to know what geocode.js
 * does, only needs to know that its either getting a err or result
 */
geocodeAddress = (geocodeAddress , callback) => {
    /* encoding address */
  	var address = encodeURIComponent(geocodeAddress);

    /* calling google for getting lat lang of address */
  request({
  	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  	json : true
  },(error, response, body) =>{
  	if(error){
      callback('Unable to connect to Google servers');
  	}else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the address');
  	}else if (body.status === 'OK') {
      callback(undefined, {
        address : body.results[0].formatted_address,
        lat : body.results[0].geometry.location.lat,
        long : body.results[0].geometry.location.lng
      });
  	}
  });
}

module.exports = {
  geocodeAddress
};
