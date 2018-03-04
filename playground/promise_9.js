console.log("starting promise_9.js");

// When need to input arguments
const asynchAdd = (a, b) => {

    return new Promise((resolve, reject) => {

        setTimeout(()=> {

            // just remind 'number' is value of "typeof"
            if (typeof a === 'number' && typeof b === 'number') {

                resolve(a + b);

            } else {

                reject('Arguments must be number.');
            }

        }, 1500);

    });

};

/*
// 1) normall promise call.
asynchAdd(5, 7)

    .then((fillout) => {

        console.log('Success: ', fillout);

    }, (errorMessage) => {

        console.log(errorMessage);

    });
*/


// promise chaining
// 2)
/*
asynchAdd(5, 7)

    .then((fillout) => {

        console.log('Success: ', fillout);
        
        // call "promise" function again with the previous "fillout"
        // Then set up below again when fillout or error is returned.  
        // Use return.
        return asynchAdd (33, fillout);

    }, (errorMessage) => {

        console.log(errorMessage);

    // set up when fillout or error is returned for
    // "promise" chaining.
    }).then((fillout) => {

        console.log('Success again:', fillout);

    }, (errorMessage) => {

        console.log('Failed 2');
    });
    */


    // "Error handler" issue in promise chaining
    /**
     * // When we have an error in the second promise chain,
    //  We we would get the expected result which is the error.

    // However, once we have the error in the first promise chain,
    //  the first result will give us the expected the error
    //  however, since the second chain, we would not have an error
    //  but "undefined".
    // It is because when the first promise ends, 
    //  the error is cleared and the code stops to work any more.
    // The argument "fillout" in the second promise chain,
    //  will be "undefined." because the first chain stops.
    // Then, the rusult of the second chain
    //  generates the "undefined" in the success state. "Success again : undefined"
    
        In order to prevent the error handler issue,
        we should change the order like success cases should be upper side.
        Then, use "catch" method. 
        
        Remind again!!! when the code faces the first error, it break.
    
    */
    
asynchAdd(5, '7')

    .then((fillout) => {

        console.log('Success: ', fillout);
 
        return asynchAdd (33, fillout);

    }).then((fillout) => {

        console.log('Success again:', fillout);

        // The second errorMessage is not requied.
    }).catch ((errorMessage) =>  {

        console.log(errorMessage);

    })

    /*error handler issue format

        geocodeAddress('19146')
        .then(() => {})
        .then(() => {})
        .catch(() => {}); 

    */


// set up when fillout or error is returned for
// "promise" chaining.

// ============================================================================================

/*

// Promise argumemnts are "resolve" and "reject".
// It returns the result of "resolve" or "reject".

const somePromise = new Promise((resolve, reject) => {

    // Asynchronous function.
    // It is not going to be called until 2.5 secs passe.
    setTimeout (() => {

        // 0) before the promise is called
        // "no pending" is available.
        // It resolves asynchronous issue.
        // "promise" is to control asynch issue like in callback!!!

       // 1) Feature: "resolve" has the first priority..
       // If "resolve" executes, "reject" will not. 
       resolve('Hey, It works!!!!');

       // 2) Feature: Also, once a "resolve" executes,
       //   the second "resolve" won't excute again. 
       // resolve('ddd'); // => not going to work.

       // "promise" does not handle function "reject"
       // So nothing will print out in console.
       // FYI, callback can invoke the function twice. 
       //   that causes huge demage.
       // reject('unable to do fill promise');

    }, 2500);
    
});

// In promise, "then" method provides the success case or unsuccess case
//  like if ~ else staement.
// "message" arguments contains all data returned 
//  like map((data) => {}) or callback (21, (data) => {});

// As it uses "somePromise" instance
//  it will not call somePromise function untill setTimeout ends
//  and "resolve" has value. 
// After, 2.5 secs, it will call the function above.
somePromise.then((message) => {

    console.log('Success: ', message);

}, (errorMessage) => {

    // "promise" deals with reject function over here, not above.
    console.log('Error: ', errorMessage);    

});

// nodemon playground/promise_9.js // => Automatic update

*/