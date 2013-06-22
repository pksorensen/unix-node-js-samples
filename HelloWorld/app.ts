/// <reference path="./Scripts/typings/node/node.d.ts" />

import http = module('http')

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(80, '10.0.0.4');
console.log('Server running at http://127.0.0.1:80/');