console.log('starting weather app_5');


const request = require('request');

const yargs = require('yargs');

const argv = yargs
    .options({

        a: {  // a => address

            demand : true, // 
            alias: 'address',
            describe : 'Address to fetch weather for',
            string: true // data from api must be a string type.
        } 

    })
    .help()
    .alias('help', 'h')
    .argv; 
 
console.log(argv);

const encodedAddress = encodeURIComponent(argv.a);
const decodedAddress = decodeURIComponent(argv.a);

request({

    // url: `https://maps.googleapis.com/maps/api/geocode/json?address=111%20st%20clair%20avenue%20west`,
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    // url: `https://maps.googleapis.com/maps/api/geocode/json?address=${decodeURIComponent(argv.a)}`,


    json: true // requests and takes the 'json' data into object
}, (err, response, body) => {

        /**
         * Error Handling
         * 
         *  - System error : no connection with wrong URL
         *  - Google Message error = invalid address input
         *  - Query Limitation error = exceeds the limitation of the defined number of queries
         */

        // because "err = null" if it does not hav error
        if (err) {

            console.log("unable to connect google server");
            
    
        } else if (body.status === 'OVER_QUERY_LIMIT') {
    
            console.log(body.message);
            
    
        } else if (body.status = 'ZERO_RESULTS') {
    
            console.log('invalid address');       
    
        } else {
    
            console.log(body.results[0].formatted_address); // full address
            console.log('Latitude: ', body.results[0].geometry.location.lat);
            console.log('Longtitude: ', body.results[0].geometry.location.lng);
    
        }

        console.log(`body: ${body}`, `response: ${response}`, `err: ${err}`);

});













