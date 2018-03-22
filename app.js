const express = require('express');
const Parser = require('key-val-parser').Parser;
const PersonDetailsHandlers = require('./writeFile.js');
let parser = new Parser();

const app = express();

const requesthandler = function (req, res) {
    const headers = req.body; 
    const parsedUserDetails = getKeyAndValueDatails(req.body.text);
    const personDetailsHandlers = new PersonDetailsHandlers();
    personDetailsHandlers.getPreviousPersonsdetails(() => {
        personDetailsHandlers.addNewPersonDetails(parsedUserDetails, headers);
        let parsedAllUserDetails = personDetailsHandlers.getAllPersonsdetails();
        personDetailsHandlers.writePersonsDetailsInFile();
      });
    res.send("Details updated");
    res.end();
}

const getKeyAndValueDatails = function (data) {
    let parsedData = parser.parse(data);
    return parsedData;
}

app.use(express.urlencoded({extended:false}));
app.post('/',requesthandler);
module.exports = app;
