console.log("starting app-promise.js");
console.log("I've gatta study promise-asynch again");

const request = require('request');

const yargs = require('yargs');

/**
 * 'axios; installation
 * 
 * npm install --save axios
 * 
 */
const axios = require('axios');


const DarkSkyKey = require('./darkSkyKey');

const argv = yargs
    .options({

        a: {

            demand: true,
            alias: 'address',
            desription: 'Adress to fetch weather for',
            string: true

        }

    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.a);

let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeURL)

    .then((res) => {

    // Invalid address does not make "err" below.
    // It just generates "invalid address" 
    //      at "res.dtat.status" of property 
    //      but same entire API data as when it successes.
        if (res.data.status === 'ZERO_RESULTS') 

            // This is not error. This is an exception.
            // Therefore, it is still in "res"
            // That is why I can use "thorw new Error"
            // When the code faces "throw new Error", it stops or breaks here

            // FYI, Don't be confused with try ~ catch.
            // It is still workging after "catch"
            throw new Error('The address is invalid.');

        
        console.log(JSON.stringify(res.data.results[0].formatted_address, undefined, 4));
        
        let lat = res.data.results[0].geometry.location.lat;
        let lng = res.data.results[0].geometry.location.lng;

        let weatherURL = `https://api.darksky.net/forecast/${DarkSkyKey.API_KEY}/${lat},${lng}`
    
        // When it fails, it weatherURL is undefined
        //      and then it stops.
        return axios.get(weatherURL);
    
    }).then((res) => {

        var currentTemp = res.data.currently.temperature;
        var apparentTemperature = res.data.currently.apparentTemperature;

        console.log(`The current temperature is ${currentTemp - 33.8}.
                     However, I feel like it is ${apparentTemperature -33.8}`);


    }).catch((err) => {

        if(err.code === 'ENOTFOUND') {

            console.log('Unable to connect to Google API server');
        
        } else {

            console.log(err.message);

        }
            
    
    

});

