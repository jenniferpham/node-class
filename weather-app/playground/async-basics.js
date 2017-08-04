console.log('Starting app'); //this is non-blocking

setTimeout( () => { //synchronous
    console.log('inside of callback');
    
}, 2000);

setTimeout( () => { //synchronous
    console.log('second setTimeout - no delay');
    
}, 0)

console.log('Finishing up'); //this is non-blocking. program continues on even though other stuff are going
