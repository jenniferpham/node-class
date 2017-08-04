console.log('Starting app.js');

const fs = require("fs"); 
const _ = require("lodash"); 
const yargs = require('yargs');  //allows us to parse "--var"

const titleOptions = {
            describe: 'Title of Note',
            demand: true,
            alias: 't'
        };
const bodyOptions = {
            describe: 'Body Description of Note',
            demand: false,
            alias: 'b'
        };
const argv = yargs
    .command('add', 'Add a new note', {  //describe your command
        title: titleOptions,  //describe what goes in your parameters
        body: bodyOptions //describe what goes in your parameters
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

const notes = require ('./notes.js');

//process is global ovject
//console.log(process.argv);
var command = process.argv[2];  //3rd item or 3rd argument of our command. stands for argument vector
//console.log('Command: ', command);

if(command === 'add'){
    console.log ('adding new note');
    var noteAdded = notes.addNote(argv.title, argv.body);
    notes.displayNote(noteAdded);
} 
else if (command === 'list'){
    console.log('listing all notes')
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach( (item) => {
        notes.displayNote(item);
    })
} 
else if (command === 'read'){
    console.log('reading all notes')
    var foundNote = notes.getNote(argv.title); //true or false
    if(foundNote.title && foundNote.body){
        notes.displayNote(foundNote);
    }
    else{
        console.log("That note could not be found")
    }
} 
else if (command === 'remove'){
    console.log('removing note')
    notes.removeNote(argv.title); //get title you remove
    var removedNote = notes.removeNote(argv.title); //returns true or false
    var message = removedNote ? "congrats you removed note"  : "didn't remove anything b/c that title didn't exist!";
} 
else{
    console.log('command not recognized')
}

//console.log('Process object', process.argv);
// console.log('Yargs', argv);
