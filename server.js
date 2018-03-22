const http = require('http');
const qs = require('querystring');
const fs = require('fs');

const PORT = process.env.PORT || 9999;
const app = require('./app');

let server = http.createServer(app);
server.listen(PORT);
console.log('listening on' + PORT);
