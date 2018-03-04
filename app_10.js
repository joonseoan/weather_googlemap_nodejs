console.log("starting app_10.js");

// const request = require('request');

const yargs = require('yargs');

// Just remind that we do not need to write down ".js"
//const weather = require('./weather/weather_8');

const geocode = require('./playground/promise_10');

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

    geocode.geocodeAddress(argv.a);