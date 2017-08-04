var somePromise = new Promise( (resolve, reject) =>{
    setTimeout( ()=> {
        resolve("Hey it worked!");
        reject("Unable to fulfill promise");
    })
})

somePromise.then((response) => {
    console.log("Success: ", response);
}, 
(errorMessage) => {
    console.log("Error: ", errorMessage)
});


var asyncAdd = (a,b) => {
    return new Promise( (resolve, reject) => {
        setTimeout( ()=> {
            if (typeof a === 'number' && typeof b === 'number'){
                resolve (a+b)
            }
            else{
                reject ("Arguments must be numbers");
            }
        }, 1500);
    })
};

asyncAdd(5,'7').then( (response) => {
    console.log("result: ", response)
}).catch((errorMessage) => {
    console.log(errorMessage);
});