console.log ("starting promise_10.js");

const request = require('request');

const geocodeAddress = (address) => {

    let encodedAddress = encodeURIComponent(address);

    return new Promise ((res, rej) => {

        request({

           url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
           json: true // requests and takes the 'json' data into object
    
        }, (err, response, body) => {

            // console.log('body: ', body)

            if (err) {

                rej('unable to connect to GoogleMap or invalid address');

            } else if (body.status === 'ZERO_RESULTS') {
                
                rej('Invalid Address');
            
            } else if (body.status === 'OVER_QUERY_LIMIT') {

                rej('Your request exceeds the number.')
                    
            } else {

                res({

                    Full_Address : body.results[0].formatted_address,
                    Latitude : body.results[0].geometry.location.lat,
                    Longtitude : body.results[0].geometry.location.lng

                });

            } 
        
        });

    });
}

geocodeAddress('111 st clair avenue west')
    .then((location) => {

        console.log('Location: ', 
        JSON.stringify(location, undefined, 4));

    }, (err) => {

        console.log('Error Message: ', err);

    });


module.exports.geocodeAddress = geocodeAddress;



//    .then(() => {})
//    .catch(() => {}); 
