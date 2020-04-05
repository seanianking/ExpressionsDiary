// This app will require functions in order to pull(get) and push(post)
// journal entries for a diary. On top of that, it will also need functions
// to edit(put) entries and to remove(delete) entries from the diary as well
// Routes for default paths to note and index pages will also need to be coded in


const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();
let PORT = process.env.PORT || 3000;

//middleware for express to get the job done
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//pulls in notes.html
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
//pulls in index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

//function to get all entries
app.get('/api/notes', function (req, res) {
    //read and parse data from JSON object array
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(JSON.parse(data));
    })
});

//function to add a new entry
app.post('/api/notes', function (req, res) {
    let newEntry = req.body;
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        let journal = JSON.parse(data);
        journal.push(newEntry);
        let id = 1
        for (let i = 0; i < journal.length; i++) {
            journal[i].id = id++;
        }
        fs.writeFile('./db/db.json', JSON.stringify(journal), function (err) {
            if (err) throw err;
            return res.status(200).send("Journal Entry Recorded")
        })
    });
});


//id is used to filer the array of notes,
//this function will remove notes from the array
app.delete('/api/notes/:id', function (req, res) {
    let removeEntry = req.params.id;
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        entries = JSON.parse(data);
        let newEntries = entries.filter(test => test.id !== +removeEntry);
        console.log(entries, newEntries, removeEntry);
        fs.writeFile('./db/db.json', JSON.stringify(newEntries), function (err) {
            if (err) throw err;
            res.send('./db/db.json');
        })
    })
})


app.listen(PORT, function () {
    console.log("App is active, check out PORT " + PORT);
})