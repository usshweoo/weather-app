const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");

const argv = yargs.
	options({
		a : {
			demand : true,
			describe : 'Address to fetch weather for',
			alias : 'address',
			string : true
		}
	})
	.help()
	.alias('h', 'help')
	.argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage);
	} else {
		console.log(results.address);
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherData)=> {
			if(errorMessage){
				console.log(errormessage);
			} else {
				console.log(`Temperature is ${weatherData.temperature}.And apparent temperature is ${weatherData.apparentTemperature}.`);
			}
		});
	}
});

// 08b4a14ad2e3f8f5b9c2791d8858a5c4




