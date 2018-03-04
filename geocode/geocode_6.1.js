console.log ('starting ./geocode/geocde based app_6');

const request = require('request');

// must be a variable containing function to be a property of "module.exports".
// Think about we cannot put a function to a "key" of an object. 
// FYI: "value" is ok with function or callback.
const geocodeAddress = (address, callback) => {

    const encodedAddress = encodeURIComponent(address);

    console.log('encodeAddress: ', encodedAddress)

    request({

        // url: `https://maps.googleapis.com/maps/api/geocode/json?address=111%20st%20clair%20avenue%20west`,
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        // url: `https://maps.googleapis.com/maps/api/geocode/json?address=${decodeURIComponent(argv.a)}`,
    
        json: true // requests and takes the 'json' data into object
    }, (err, response, body) => {
    
    
            // because "err = null" if it does not hav error
            if (err) {

                // Actaull "callback" has two arguments.
                // However, we used conditional statement like
                // if the one is available, the other is not going to be available.
                // In other words, the second argument is not necessary.
                // Thererfore, we can pass a single argument through the callback.
                callback('unable to connect google server');
    
               // console.log("unable to connect google server");
                
        
            } else if (body.status === 'OVER_QUERY_LIMIT') {
        
                callback(body.message);
                
                // console.log(body.message);
                
        
            } else if (body.status === 'ZERO_RESULTS') {
        
                callback('invalid address');
                // console.log('invalid address');       
        
            } else {

                // when we pass the second argument, we need to give null / undefined of
                // the first argument so that it correctly returns value.

                // Otherwise, the caller will notice that the actual second argument is the first arument.
                callback(null, {

                        Full_Address : body.results[0].formatted_address,
                        Latitude : body.results[0].geometry.location.lat,
                        Longtitude : body.results[0].geometry.location.lng
                    
                });
        
                // console.log(); // full address
                // console.log();
                // console.log();
        
            }
    
            // console.log(`body: ${body}`, `response: ${response}`, `err: ${err}`);
    });



}


// joon's code
/*
module.exports = {

    geocodeAddress

}

*/

// andrew's code : it is simpler than my code. 
// geocodeAddress = geocodeAddress => { geocodeAddress } in my code.
module.exports.geocodeAddress = geocodeAddress;

