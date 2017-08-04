const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true, //required
            alias: 'address', //this option can also be set with this nickname
            describe: 'Address to fetch longitutde and latitude',
            string: true //always parse as a string, can put in true/false
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then( (response)=> {
    if(response.data.results.length === 0){
        throw new Error("there are no results");
    }
    else{
        var location = response.data.results[0].geometry.location;
        var lat = location.lat;
        var lng = location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/934893765d3bdcbe8d84cdb9405b78b3/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);  //returning a promise
    }
    
})
.then( (weatherResponse) => {
    var currentTemp = weatherResponse.data.currently.temperature;
    var apparentTemp = weatherResponse.data.currently.apparentTemperature;
    console.log(`It's currently ${currentTemp}, but it feels like ${apparentTemp}`);
})
.catch( (err) => {
    if(err.status === "ZERO_RESULTS"){
        console.log('there are no results for that address')
    }
    else if (err.code ==="ENOTFOUND"){
        console.log("unable to connect to API servers")
    }
    else{
        console.log(err.message);
        
    }
    
    
})
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if(errorMessage){
//         console.log(errorMessage);
//     }
//     else{
//         //lat, lng, callback
//         weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//             if(errorMessage){
//                 console.log(errorMessage);
//             }
//             else{
//                 // JSON.stringify(weatherResults, undefined, 2);
//                 // console.log(weatherResults);
//                 console.log(`It is currently ${weatherResults.temperature}. It feels like it is ${weatherResults.apparentTemperature}.`);
                
//             }
//         });
//     }
// });
