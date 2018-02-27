/**
 * - The down below is asynchronous.
 *  
 *  . The last console "console.log('ending asynch-basics');"
 *    does not wait until callback function finishes in two seconds.
 *  
 *  . The "console.log('ending asynch-basics');" executes itself 
 *    without waiting for the result of callback function of setTimeout, a blocking method.
 *  
 *  . So the result in terminal as followed.
 *      $ node playground/asynch-basics.js
        starting asynch-basics
        ending asynch-basics
        inside of callback

    . Even when we setTimeout with 0 msec, we have the same result as followed.
        $ node playground/asynch-basics.js
        starting asynch-basics
        ending asynch-basics
        inside of callback with 0 m sec.
        inside of callback with 2000 m secs
 *  
 */
console.log('starting asynch-basics');

// setTimeout (callback, setTime)
setTimeout (() => {

    console.log("inside of callback with 2000 m secs");

}, 2000);

setTimeout (() => {
    console.log("inside of callback with 0 m sec.")
}, 0);

console.log('ending asynch-basics');

/**
 * 
 * ---- V8 ---
 * 
 * case1 : Code stacks of top-down flow inside of [call stack] only
 * 
 *  (Ex1: Synch function)
 *  var x = 1;
 *  var y = x+9;
 *  console.log(`y is ${y}`)
 * 
 * 1) It does do two things : 
 *   - add something on the top of the existings
 *   - remove something on the top of the existings
 *      
 *     - Based on main() "function"
 *     <1>
 *      var x = 1 // ==> second. Then, removed
 *      main() // ==> first one that starts running
 * 
 *     <2>
 *      var y = x + 1 // ==> second. Then, removed
 *      main() // ==> first one that starts running
 * 
 *      <3>
 *      console.log(`y is ${}`) // ==> second. Then, removed
 *      main() // ==> first one that starts running
 *      And, node process is closed.
 *      
 *      <4>
 *      Since <3> is the last code, main() finishes and removed.
 * 
 *      Therefore, main executes from the top of the codes.
 * 
 * (Ex2: Asynch function)
 *  var add = (a, b) => {
 *      var total = a + b;
 *      
 *      return total;
 *  };
 * 
 *  var res = add(3, 8);
 *  
 *  console.log(res);   
 * 
 *   
 *  - Based on main() "function"
 *     <1>
 *      var add = (a, b) { };// ==> second. Then, removed
 *      main() // ==> first one that starts running
 * 
 *     <2> 
 *      add (); // => second, recalling the function
 *      main() // ==> first one that starts running
 * 
 *      <3>
 *      var total = a + b // => third, exetuting add() inside function 
 *      add (); // => second, recalling the function
 *      main() // ==> first one that starts running
 *     
 *      <3>
 *      return total // => third, executing return
 *      add(); // second, still remain until add(){} ends
 *      main(); // => the first one that starts running.
 * 
 *      <4>
 *      console.log(res);
 *      main();
 * 
 *      <5>
 *      Since <4> is the last code, main() finishes 
 * 
 * 
 * Case 2: [CallStack] -> [Node API] -> [ Callback Queue ] process required .
 * 
 * Ex1)
 * console.log('Starting app');
 * 
 * setTimeout( () => {
 * 
 *      console.log('Inside of callback');
 * 
 * }, 2000);
 * 
 * 
 * setTimeout( () => {
 * 
 *      console.log('Inside of callback');
 * 
 * }, 0);
 * 
 * console.log('Finishing up');
 * 
 * 
 * **** Just remember: call stack deals with a single execution at a time. 
 * 
 * <step 1>
 * console.log('Starting app');
 * main()
 * 
 * // setTimeout is not in nodejs. It is a function nodejs has to access to.
 * <step 2>
 * setTimeout (callback, 2000) // [call stack]
 * main() // [call stack]
 * 
 * 
 * <step 3>                         
 *                                  // the counting down is here.*****
 *                                  setTimeout (callback, 2000) // [node API]
 * 
 * setTimeout (callback, 0) [call stack]
 * main() // [call stack]
 * 
 * 
 * <step 4>
 *                                  setTimeout (callback, 2000) // [node API]
 *                                  setTimeout (callback, 0) // [node API]
 * 
 * main() // [call stack]
 * 
 * 
 * <step 5>                                                      // callback queue is a spot to make a callback function wait to get ready to be fired
 *                                                              setTimeout (callback, 0) // [callback queue]
 *                                  setTimeout (callback, 2000) // [node API]
 * console.log("finishing");
 * main() // [call stack]
 * 
 * ***** The [event loop] is waiting for [call stack] empty. Even main() must not be available. 
 * ***** Remember [call stack] deals with just one execution at a time.
 * ***** In the meantime, [event loop] takes look at what [call stack] is working on.
 * ***** 1) If it works on anyting. the first callback waits until [call stack ] finishes its work.
 * ***** 2) If nothing is going on in [call stack], [event loop] notifies [callback queue] [call stack] is available for the execution. 
 *  
 * <step 6>
 *                                                              setTimeout (callback, 2000) // [callback queue]
 *                                                              setTimeout (callback, 0) // [callback queue]
 * 
 * 
 * <step 7>
 *                                                                               
 *                                                                               setTimeout (callback, 2000) // [Event Loop]
 * 
 * setTimeout (callback, 0) // [return]
 * main() // [call stack]
 * 
 * 
 * <step 8>
 *                                                                               
 *                                                                               
 * 
 * setTimeout (callback, 2000) // [Event Loop]
 * main() // [call stack]
 * 
 * <step 9>
 * 
 * main()
 * 
 * <step 10>
 * finishing
 * 
 */


