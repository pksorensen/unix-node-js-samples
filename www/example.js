var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
   // console.log('hello world');
}).listen(80, '10.0.0.4');
console.log('Server running at http://s-innovations-unix.cloudapp.net:80/');