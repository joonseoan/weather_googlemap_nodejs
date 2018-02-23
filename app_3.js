console.log('starting weather app');

/**
 * Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

  var request = require('request');
  request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
}); 
 */

const request = require('request');


// request( {options of object => configuration, for instance "url" down below}, (with err, response, body arguments) callback =>  {  })
// **** Same way as before in callback_2.js , callback is to have the data from a specific http server comes back.!!!!!!
// In this project, the callback will be implemented to get google map api data
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=111%20st%20clair%20avenue%20west`,
    json: true // takes the json data into object
}, (err, response, body) => {

    console.log(body);

});
