console.log('starting weather app');

/**
 * Request is designed to be the simplest way possible to make http calls. 
 * It supports HTTPS and follows redirection by default.

  var request = require('request');
  request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code 
                            if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
}); 
 */

const request = require('request');


// request( {options of object => configuration, for instance "url" down below}, 
//          (callback: with err, response, body arguments) callback =>  {  })
// **** Same way as before in callback_2.js , callback is to have the data from a specific http server comes back.!!!!!!
// In this project, the callback will be implemented to get google map api data

/*
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=111%20st%20clair%20avenue%20west`,
    json: true // requests and takes the 'json' data into object
}, (err, response, body) => {

    
    console.log(`body: ${body}`, `response: ${response}`, `err: ${err}`);
    console.log('body ==> ', body);
    // console.log('response ==> ', response)
});

*/

/**
 * [Pretty Printing Ojbect]
 * 
 * In order to improve readabiltiy.
 * 
 */

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=111%20st%20clair%20avenue%20west`,
    json: true // requests and takes the 'json' data into object
}, (err, response, body) => {

    
    console.log(`body: ${body}`, `response: ${response}`, `err: ${err}`);
    
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

    console.log (body.results[0].formatted_address); // full address
    console.log ('lat & lng: ', body.results[0].geometry.location);


});


