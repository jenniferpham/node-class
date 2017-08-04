const request = require('request'); //makes easy http calls

var geocodeAddress = (address) => {
    return new Promise( (resolve, reject) => {
        var encodeAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
            json: true  //convets it to json for us
        }, (error, response, body) => {
            // console.log(JSON.stringify(response, undefined, 2));
            if(error){ //there is an error in the request. ex: url is wrong
                reject('unable to connect to google servers');  //first parameter is errorMessage
            }
            else if (body.status === "ZERO_RESULTS"){
                reject('unable to find that address');   //first parameter is errorMessage    
            }
            else if(body.status === "OK") { 
                var locationObj = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                }
                resolve(locationObj);
                
            }
        })
       
    })
    


};

geocodeAddress('00000').then( (location) => {
    console.log(JSON.stringify(location, undefined, 2));
}).catch((errorMessage) => {
    console.log(errorMessage);
})