//Sample API Call: https://api.darksky.net/forecast/934893765d3bdcbe8d84cdb9405b78b3/37.8267,-122.4233
//API KEY: 934893765d3bdcbe8d84cdb9405b78b3
const request = require('request');

var getWeather = (lat, lng, callback) => {
    var lat = lat;
    var lng = lng;
    request({
        url: `https://api.darksky.net/forecast/934893765d3bdcbe8d84cdb9405b78b3/${lat},${lng}`,
        json: true

    }, (error, response, body) => {
        // if(error){
        //     console.log('unable to get forecast.io service');
        // }
        // else if(response.statusCode === 400){
        //     console.log('unable to fetch weather. the given location or time is invalid');
        // }
        // else if(response.statusCode === 200){
        //      console.log(JSON.stringify(body.currently.temperature, undefined, 2));
        // }
        if(!error & response.statusCode === 200){
           // console.log(JSON.stringify(body.currently.temperature, undefined, 2));
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            }); //errorMessage is undefined because not an error, 2nd parameter is considered weatherResults on app.js
        }
        else{
            callback('unable to fetch weather. Could be because time or location is invalid or because we couldnt get forecast.io service');
            
        }


    })
};


//does the same thing
// module.exports = {
//     getWeather: getWeather
// }
module.exports.getWeather = getWeather