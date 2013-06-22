define(["require", "exports", 'http'], function(require, exports, __http__) {
    /// <reference path="./Scripts/typings/node/node.d.ts" />
    /// <reference path="./Scripts/typings/node-azure/azure.d.ts" />
    var http = __http__;
    

    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    }).listen(80);
    console.log('Server running at http://127.0.0.1:80/');
});
//@ sourceMappingURL=app.js.map
