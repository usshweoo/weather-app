const yargs = require("yargs");
const axios = require("axios");

const argv = yargs.
	options({
		a : {
			
			describe : 'Address to fetch weather for',
			alias : 'address',
			string : true
		}
	})
	.help()
	.alias('h', 'help')
	.argv;
if(argv.a === undefined){
	console.log('Set default address to New York');
	argv.a = "New York";
}
var encodeAddress = encodeURIComponent(argv.a);
console.log(encodeAddress);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;
axios.get(geocodeUrl)
	.then((response) => {
		if(response.data.status === "ZERO_RESULTS"){
			throw new Error('Unable to find that address!');
		}
		console.log(JSON.stringify(response.data, undefined, 2));
		console.log(`Address - ${response.data.results[0].formatted_address}.`);
		var lat = response.data.results[0].geometry.location.lat;
		var lng = response.data.results[0].geometry.location.lng;
		var url = `https://api.darksky.net/forecast/08b4a14ad2e3f8f5b9c2791d8858a5c4/${lat},${lng}`;
		return axios.get(url);
	})
	.then((response)=> {
		var temperature = response.data.currently.temperature;
		var apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`Temperature is ${temperature}. It feels like ${apparentTemperature}.`);
	})
	.catch((e)=> {
		if(e.code === "ENOTFOUND"){
			console.log('Unable to connect to server!');
		} else {
			console.log(e.message);
		}
	})







