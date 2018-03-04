console.log('starting weather_8.js');

const request = require('request');

const apiKey = require('../darkSkyKey.js');

const API_KEY = apiKey.API_KEY;


/* Joon's code

const getWeather = (lat, lng) => {

    request ({

        url : `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
        json : true
    
    }, (err, response, body) => {
    
       
        if (!err && response.statusCode === 200) {
    
            console.log(body.currently.temperature - 33.8);
    
        } else {
    
            console.log('unable to fetch termperature.');
        }
    
    });

};

*/


// Joon's code === Andrew's code
const getWeather = (lat, lng, callback) => {

    request ({

        url : `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
        json : true
    
    }, (err, response, body) => {
    
       
        if (!err && response.statusCode === 200) {

            callback(null, {
            
                temperature: body.currently.temperature - 33.8,
                apparentTemperature: body.currently.apparentTemperature -33.8
            
            });

            console.log('body.currently.temperature - 33.8: ',
             body.currently.temperature - 33.8);
    
        } else {

            callback('unable to fetch termperature.');
            // console.log('unable to fetch termperature.');
        }
    
    });

};


module.exports.getWeather = getWeather;





