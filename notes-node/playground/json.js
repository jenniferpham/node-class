// var obj = {
//     name: 'Andrew'
// };
// var stringObj = JSON.stringify(obj);  //converts json obj into string
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name": "Andrew", "age": 25}';
// var personObj = JSON.parse(personString); //converts string into json object
// console.log(typeof personObj);
// console.log(personObj);


const fs = require('fs'); //file system node module

var originalNote = {
    title: 'Some title',
    body: 'Some body'
}

var originalNoteString = JSON.stringify(originalNote); //change object to string and then write that inside of notes.json (must be relative path). If it is written as an object and not as string, it will come in as [object object]
fs.writeFileSync('./../notes.json', originalNoteString);  

var noteString = fs.readFileSync('./../notes.json', (err, data) =>{
    return JSON.parse(data)  //change string to object so property could be read
})
//also could be var noteString = fs.readFileSync('./../notes.json')
var note = JSON.parse(noteString);
//noteObject
console.log(typeof note);  //object
console.log(note.title); //string value inside of object