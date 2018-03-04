console.log("starting app_8.js");

// const request = require('request');

const yargs = require('yargs');

// Just remind that we do not need to write down ".js"
const weather = require('./weather/weather_8');

const geocode = require('./geocode/geocode_6.1');


/* Joon's code
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
    
    lat = body.results[0].geometry.location.lat;
    lng = body.results[0].geometry.location.lng;

    weather.getWeather(lat, lng);
    
});

*/

//-----------------------------------------------------------------------------

// Andrew's code

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

    // url : `https://api.darksky.net/forecast/${API_KEY}/43.6866757,-79.39944299999999`,

  
// Joon's code === Andrew's code

geocode.geocodeAddress(argv.a, (errMsg, correctResult) => {

    
   // errMsg ? console.log(errMsg) : console.log(JSON.stringify(correctResult, undefined, 4));
   
   if (errMsg)
   console.log(errMsg);

    // To get the data, we must not use "JSON.stringfy()" !!!!
    // const coordinate = JSON.stringfy(correctResult)
    const coordinate = correctResult;

    //console.log('correctResult:', correctResult);
    
    weather.getWeather(coordinate.Latitude, coordinate.Longtitude, (err, temperature) => {

        if (err)
        console.log(err);
    
        console.log (`The temperature is ${temperature.temperature}.`);      
        console.log (`However, I feel like the temperature is ${temperature.apparentTemperature}.`);
    
    });
});

















