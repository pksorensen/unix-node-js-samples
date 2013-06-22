var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(80, 's-innovations-unix.cloudapp.net');
console.log('Server running at http://s-innovations-unix.cloudapp.net:80/');