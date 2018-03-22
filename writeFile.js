const fs = require('fs');
let Dropbox = require("dropbox");
let accessToken = process.env.ACCESS_TOKEN;
var dbx = new Dropbox({
  accessToken: accessToken
});

let personHandlers = function () {
  this.personsDetails = undefined;
}

personHandlers.prototype.getPreviousPersonsdetails = function (callback) {
  let self = this;
  dbx.filesDownload({path:"/userdata.json"})
  .then(function(response) {
    let parsedDetails = JSON.parse(response.fileBinary);
    self.personsDetails = parsedDetails;
    callback();
  })
  .catch(function(error) {
    console.error(error);
    return;
  });
};

personHandlers.prototype.addNewPersonDetails = function (newPerson, headers) {
  this.personsDetails[headers.user_name] = newPerson;
};

personHandlers.prototype.writePersonsDetailsInFile = function () {
  let persons = this.personsDetails;
  let details = JSON.stringify(persons, null, 2);
  if (details) {
    args = {
      contents: details,
      path: "/userdata.json",
      mode: {
        '.tag': 'overwrite'
      },
      autorename: false,
      mute: false
    }
    dbx.filesUpload(args);
  }
};

personHandlers.prototype.getAllPersonsdetails = function () {
  return this.personsDetails;
}

module.exports = personHandlers;