//console.log('notes.js');

//console.log(module); //all node files have access to an object called module
//only module.exports really matters b/c that is what other files pick up

// module.exports.age = 25;

// module.exports.addNote = () => {
//     //anonymous function. doesn't bind "this"
//     console.log('addNote');
//     return 'New note';
// };

// module.exports.sum = (a,b) => {
//     var sumNumber = a+b;
//     return sumNumber;
// }

const fs = require("fs");
var totalNotes = [];
const notesFile = "./notes-text.json";

var getNotes = () => {
    var fileExists = fs.existsSync(notesFile);
    if(fileExists){
        var readNotes = fs.readFileSync(notesFile);
        return JSON.parse(readNotes);
    }
    else{
        return [];
    }
}

var duplicateNoteExists = (title) => {
    var duplicateNotes = totalNotes.filter( (item)=> item.title === title); //duplicateNote becomes array of the duplicated note
    if(duplicateNotes.length ===0){
        return false;
    }else{
        return true;
    };
}

var addNote = (title, body) =>{
    totalNotes = getNotes();  //json object - array of objects inside of notes-text.json

    //put input into an object
    var note = {
        title: title,
        body: body
    }

    if(!duplicateNoteExists(note.title)){
        totalNotes.push(note);
        saveNotes(totalNotes);
        console.log("Added title (", note.title, ") and body (", note.body, ") successfully");
    }
    else{
        console.log("you already added note with title:", note.title, ". Stop adding crap in here!");
    }
    return note;
    
};

var saveNotes = (notesArray) => {
    fs.writeFileSync("./notes-text.json", JSON.stringify(notesArray)); 
}

var getAll = () => {
    console.log('getting all notes');
    var allNotes = getNotes();
    return getNotes();
}

var getNote = (title) => {
    console.log("getting note ", title);
    totalNotes = getNotes(); //reading notes-text.json and getting JSON parsed array of note objects
    var foundNoteArray = totalNotes.filter( (item) => item.title === title ); //returns array
    var foundNote = foundNoteArray[0] ? foundNoteArray[0] : {};
    return foundNote;
}

var removeNote = (title) => {
     totalNotes = getNotes();  //json object - array of objects inside of notes-text.json
     var filteredNotes = totalNotes.filter( (item) => item.title !== title);
     saveNotes(filteredNotes);
     return (filteredNotes.length === totalNotes.length);
}

var displayNote = (note) => {
    console.log("----");
    console.log(`Title: ${note.title}`); //ES6 template strings with backticks
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,  //if it's the same "addNote: addNote", you can just type it once without colon for ES6
    displayNote,
    getAll,
    getNote,
    removeNote
}