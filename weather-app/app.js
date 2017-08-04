const yargs = require('yargs');
const geocode = require('./geocode/geocode'); //can leave .js off
const weather = require('./weather/weather'); //can leave .js off

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


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        //lat, lng, callback
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                // JSON.stringify(weatherResults, undefined, 2);
                // console.log(weatherResults);
                console.log(`It is currently ${weatherResults.temperature}. It feels like it is ${weatherResults.apparentTemperature}.`);
                
            }
        });
    }
});
