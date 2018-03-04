console.log("starting app_7.js");

const request = require('request');

const yargs = require('yargs');

const darkSkyKey = require('./darkSkyKey.js');
const API_KEY = darkSkyKey.API_KEY;

/* [Joon's code]
const argv = yargs
    .options({

        a : {

            demand: true,
            alias: 'address',
            describe: "Is is an address the user typed",
            string: true

        }
        
    })
    .help()
    .alias('help', 'h')
    .argv;

const address = encodeURIComponent(argv.a);

let lat = null;
let lng = null;

request({

    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true

}, (err, response, body) => {

    if(err) {

        console.log('sone error occurs in Google connection');
    }
    
    console.log(body.results[0].formatted_address); // full address
    lat = body.results[0].geometry.location.lat;
    lng = body.results[0].geometry.location.lng;
    
    request({

        url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
        json: true    
    
    }, (err, response, body) => {

    
        
        if (err) {
            console.log('errormesage', err);
        }

        // console.log(JSON.stringify(body, undefined, 4));
        console.log(body.currently.temperature);
    
    });


});

*/

request ({

    url : `https://api.darksky.net/forecast/${API_KEY}/43.6866757,-79.39944299999999`,
    json : true

}, (err, response, body) => {

   //  console.log('response: ', JSON.stringify(body, undefined, 4));

   /*
    if(err) {
     
        console.log("unable to connect to darkSky.")
    
    } else if ( body.code === 400 ) {

        console.log("invalid latitude or longtitude");
    
    } else {

        console.log(body.currently.temperature);

    }
    */
   
    if (!err && response.statusCode === 200) {

        console.log(body.currently.temperature);

    } else {

        console.log('unable to fetch termperature.');
    }
    

});
