console.log('Starting app.js');

const fs = require("fs"); //fetch all contents of fs module and store in fs variable
const os = require("os");  //parameter is global module name - see npm api documentation
const notes = require("./notes.js"); //tell where file lives using a relative path b/c it's my file versus public node module like fs and os
const _ = require('lodash');  //looks for core module first and it doesnt exist. then it looks at node_modules folder and it finds it here. it's a set of really handy utilities
var user = os.userInfo();
//console.log(user);

//Option 1
//fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, function (err){  //if greetings.txt file doesn't exist, it will create it
//     if(err){
//         console.log('unable to write to fall');
//     }
// });

//Option 2
//fs.appendFileSync('greetings.txt', 'Hello world!'); //asynchronous


// var res = notes.addNote();
// console.log(res);

//take method from notes.js
// var result = notes.sum(5,2);
// console.log(result); //7
// console.log('Result: ', notes.sum(5,2));

//lodash functions

//checks if value is string or not, returns true or false
console.log(_.isString(true));
console.log(_.isString('Andrew'));

//_.uniq(value) - returns an array with all duplicates removed
var arr = ['Andrew', 1, 2, 3, 2, 2, 'Andrew', 5, 5, 4, 2, 6];
var filteredArray = _.uniq(arr);
console.log(filteredArray);