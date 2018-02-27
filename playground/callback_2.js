
// Keep in mind that callback function is different from asynchronous.*** Do not be confused.

// It is an example before we make a "http" request to Google.
// assigns id
// we will call callback with data or object

// It is same as setTimeout(callback, delay). 
// "callback" is called later with "delay", milliseconds

// 이가게 아직 준비가 안됬네....준비 다 되면 callback (다시 전화 할께요.) 
const getUser = (id, callback) => {

    
    let user = {

        id,
        name: 'joon'

    };
    
    //1)
   // it invokes callback function inside of "callback" argument above. 
   // "user" is the object above
   // callback(user);


   // What if we use setTimeout
   setTimeout ( () => {

    // It is a caller
    // 자 이제 전화 합니다.!!! 따르르등!!!!
    callback(user);  

   }, 3000)
  
};


// 자 이제 준비 됬어요!!!! 불러 봐요! 전화 해 줘요..!!!

// Now here, we go ahead to call getUser function
// and fill out the "callback" function above.
// Here, the callback enables the user data to come back.!!!
// When user data comes back, they comes with "user" argument. It is very important!!!
 
// "userObj" is assigned to store the user data.

// It is similar way to use map()
// Array.map((data) => { return; })
// "data" argumeeent above takes up the ojbect or insdie of an array.
// only "userObj" is able to access the object inside of "getUser" 
getUser(31, (userObj) => {

     // here in callback inside, it states that we wanna run the user data comes back. 
    console.log(userObj);

});


/**
 * [Google Map ]
 * 
 * [format example]
 * https://maps.googleapis.com/maps/api/geocode/json?key=value&keytwo=valuetwo"
 * 
 * For instance : https://maps.googleapis.com/maps/api/geocode/json?address= 111 st. clair avenue west
 * ==> goople map api data in json fomat 
 * 
 * We will take an advantage of this json data format
 * 
 */

 /**
  * In order to request http to google api server,
  * We need to use "npm request"
  * 
  * setup:  
  * 
  * 1. npm init
  * 
  * 2. npm install request@2.83.0 --save
  * 
  * 
  */


// -----------------------------------------------
/*
const getUsers = (id = jsfsa, name = 'dda') => {

    console.log ('this: ', this.getUsers); // => undefined, // still no way to change property 'name' value
    console.log ('getUsers.user', getUsers.user)

    console.log(id, "ddd");
    console.log(name, "sss");
    
    const user = {

        id,
        name: 'joon'

    };

    return user;
    
   // it invokes callback function inside of "callback" argument above. 
   // "user" is the object above
  
};

console.log(getUsers(21, 'eunmi'), "sssss");
console.log ('getUsers.user', getUsers(35, 'babo')); // still no way to change property 'name' value


*/
/*
// -------------------------------------
const getUserss = { 
        id: 33,
        name: 'joon'
    };

    getUserss.id = 10;
    getUserss.name = 'eunmi'
    
   // it invokes callback function inside of "callback" argument above. 
   // "user" is the object above

console.log(getUserss, "ddddd");
*/

/*

const ddd = () => {
 
    const x = { y : 'z'}

    return x;

}

console.log(ddd());

*/


