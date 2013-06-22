/// <reference path="./Scripts/typings/node/node.d.ts" />
/// <reference path="./Scripts/typings/node-azure/azure.d.ts" />

import http = module('http');
import azure = module('azure');

http.createServer(function (req, res) {

    

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');

    
}).listen(80);
console.log('Server running at http://127.0.0.1:80/');