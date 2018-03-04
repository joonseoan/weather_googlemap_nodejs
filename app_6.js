console.log('starting weather app_6.js');


const yargs = require('yargs');

// const geocode = require('./geocode/geocode.js');
const geocode = require('./geocode/geocode_6.1.js');

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
 
    // geocode.geocodeAddress(argv.address); // 'address' is the alias of 'a'
    // joon's code
    // However, it should be in geocode file to look good.
    // const encodedAddress = encodeURIComponent(argv.a);


// "argv.a" for invoking the object of geocode.js.
// Just make sure two arguments are alternatively used.
// For instance, the one is available, the other is not going to be available.
geocode.geocodeAddress(argv.a, (errMsg, correctResult) => {

    // please, remembeer arguments of stringfy()
    errMsg ? console.log(errMsg) : console.log(JSON.stringify(correctResult, undefined, 4));

    /*
    const ddd = {

        name : 'joon',
        school : 'f sheridan'
    }
    console.log(JSON.stringify(ddd, undefined, 4));
    */

    /*
    if (errMsg) {
      
        console.log(errMsg);
        
    } else {

        console.log(body)

    }
    */

});


