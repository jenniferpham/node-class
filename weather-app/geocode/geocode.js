const request = require('request');

var encodeAddress = (address) => encodeURIComponent(address);

var geocodeAddress = (address, callback) => {
    var prettyAddress = encodeAddress(address);
    request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${prettyAddress}`,
            json: true  //convets it to json for us
        }, (error, response, body) => {
            // console.log(JSON.stringify(response, undefined, 2));
            if(error){ //there is an error in the request. ex: url is wrong
                callback('unable to connect to google servers');  //first parameter is errorMessage
            }
            else if (body.status === "ZERO_RESULTS"){
                callback('unable to find that address');   //first parameter is errorMessage    
            }
            else if(body.status === "OK") { 
                callback(undefined, {  //first parameter is undefined meaning errorMessage is undefined, 2nd parameter is the results
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        })
    }


module.exports = {
    geocodeAddress: geocodeAddress
}