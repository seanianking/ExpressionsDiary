// This app will require functions in order to pull(get) and push(post)
// journal entries for a diary. On top of that, it will also need functions
// to edit(put) entries and to remove(delete) entries from the diary as well
// Routes for default paths to note and index pages will also need to be coded in


const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();
let PORT = process.env.PORT || 3000;

//ID must be declared as a variable globally 
//since it will be used in multiple functions
//throughout the app
let id = 1;

//functions for express to get the job done
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//pulls in notes.html
app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//function to get all entries
app.get('/api/notes', function(req, res) {
    //read and parse data from JSON object array
    fs.readFile('./db/db.json', 'utf8', function(err, data){
        if (err) throw err;
        res.send(JSON.parse(data));
    })
});

//function to add a new note




app.listen(PORT, function(){
    console.log("App is active, check out PORT " + PORT);
})