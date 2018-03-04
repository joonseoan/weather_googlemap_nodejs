console.log('starting weather app_4');

// Use yargs finally!!!

/**
 * Setup  : npm install yargs@4.7.1 --save
 * 
 * 
 */

const request = require('request');

const yargs = require('yargs');

// options : configuring object like 
/**
 *  Wd did it at the last lecture of the last session
 * 
 *  url: `https://maps.googleapis.com/maps/api/geocode/json?address=111%20st%20clair%20avenue%20west`,
    json: true // requests and takes the 'json' data into object
 
*/





/**
 * [Result: 1]
 * $ node app_4.js -h
    starting weather app_4
    Options:
     -a, --address  Address to fetch weather for              [string] [required]  --help, -h     Show help                                           [boolean]
 * 
 * 
 * [result 2]
 * $ node app_4.js -a '111 st. clair avenue west'
    starting weather app_4
    { _: [],
    help: false,
    h: false,
    a: '111 st. clair avenue west',
    address: '111 st. clair avenue west',
    '$0': 'app_4.js' }
 * 
 */

// 'argv' here will take all data in the methods and objects.
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
 
 // set up alias of one of methods
 // help() = > h
 .alias('help', 'h')

// the end of argv and store all data in argv variable above.
 .argv; 




/**
 * $ node app_4.js
    starting weather app_4
    Options:
    -a, --address  Address to fetch weather for              [string] [required]  --help, -h     Show help                                           [boolean]
    Missing required argument: a
 * 
 */
 
console.log(argv);

/**
 * URIEncod and URIDecode
 * 
 * $ node
    >encodeURIComponent('111 st clair')
    => '111%20st%20clair'>


    %20
    > decodeURIComponent('joonan%20stupid')
    => 'joonan stupid'
    >

 */

 // by using URI ENCOD AND DECODE
 /**
  * by using : url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.a)}`,
  * $ node app_4.js -a '111 st clair avenue west'
        starting weather app_4
        { _: [],
        help: false,
        h: false,
        a: '111 st clair avenue west',
        address: '111 st clair avenue west',
        '$0': 'app_4.js' }
        body: [object Object] response: [object Object] err: null
        111 St Clair Ave W, Toronto, ON M4V 1N5, Canada
        lat & lng:  { lat: 43.6866757, lng: -79.39944299999999 }
  * 
  * 
  * 
  * by using : url: `https://maps.googleapis.com/maps/api/geocode/json?address=${decodeURIComponent(argv.a)}`,
  * $ node app_4.js -a '111%20%20st%20clair%20avenue west'
  * starting weather app_4
    { _: [],
    help: false,
    h: false,
    a: '111%20%20st%20clair%20avenue west',
    address: '111%20%20st%20clair%20avenue west',
    '$0': 'app_4.js' }
    body: [object Object] response: [object Object] err: null
    111 St Clair Ave W, Toronto, ON M4V 1N5, Canada
    lat & lng:  { lat: 43.6866757, lng: -79.39944299999999 }
  * 
  */

const encodedAddress = encodeURIComponent(argv.a);
const decodedAddress = decodeURIComponent(argv.a);

request({

    // url: `https://maps.googleapis.com/maps/api/geocode/json?address=111%20st%20clair%20avenue%20west`,
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    // url: `https://maps.googleapis.com/maps/api/geocode/json?address=${decodeURIComponent(argv.a)}`,


    json: true // requests and takes the 'json' data into object
}, (err, response, body) => {
    
    // 1) 
    // console.log('body ==> ', body);

    // 2)
    // In a pretty way
    // the second argument (undefined) =>' fiterout' property we will never use
    // the third argument (2) here => indentation
    // So we can get same format of 'Json VIew' in Chrome.
    
    // console.log(JSON.stringify(body, undefined, 2));
    
    
    
    // 1) statusCode: 200 // => telling us the status cod about user's http request.
    //              " 200" => Everything is great.
    //              " 404" => server not available
    //              " 500" => server crashed
    // 2) body : // it is a same information of "body" above
    // 3) header : header of http protocol 
    //              containing google api server name, content type, expirey and so on
    // 4) request : host info, port number, protocol info
    //              request METHOD (Get/Post), accept or deny
    
    //console.log(JSON.stringify(response, undefined, 2));


    // setup error first.
    // Then, we will get the error message like below.
    // When we have wrong URL information,
    /**
     * gleapi.com maps.googleapi.com:443
        {
        "code": "ENOTFOUND", // loal machine could not access the server
        "errno": "ENOTFOUND",
        "syscall": "getaddrinfo",
        "hostname": "maps.googleapi.com",
        "host": "maps.googleapi.com",
        "port": 443
        }
     * 
     * 
     * Without any error
     * err = null;
     */

    // console.log(JSON.stringify(err, undefined, 2));
   

    // to access objects of "body" object
    console.log(`body: ${body}`, `response: ${response}`, `err: ${err}`);
    console.log('Full Address:', body.results[0].formatted_address); // full address
    console.log('Latitude: ', body.results[0].geometry.location.lat);
    console.log('Longtitude: ', body.results[0].geometry.location.lng);

});