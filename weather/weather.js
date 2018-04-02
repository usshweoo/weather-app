const request = require("request");


var getWeather = (lat, lng, callback) => {
	request({
		url : `https://api.darksky.net/forecast/08b4a14ad2e3f8f5b9c2791d8858a5c4/${lat},${lng}`,
		json : true
	}, (error , response , body) => {
		if(!error && response.statusCode === 200){
			callback(undefined, {
				temperature : body.currently.temperature,
				apparentTemperature : body.currently.apparentTemperature
			});
		} else {
			console.log('Unable to fetch weather.');
		}
		
	});
}

module.exports.getWeather = getWeather;
