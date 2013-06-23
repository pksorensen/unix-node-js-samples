/// <reference path="./Scripts/typings/node/node.d.ts" />
/// <reference path="./Scripts/typings/express/express.d.ts" />

import express = module("express");
import azuresync = module("azuresync");
import fileupload = module('fileupload');

var app: ExpressApplication = express();
app.use(express.compress());
app.use(express.bodyParser());

var fuh = new fileupload.FileUpload('/uploadDir').middleware;

app.get('/', function (req, res) {
    console.log('Welcome hit ' + req.query['testQS']);
    res.send(200, 'Welcome to S-Innovations Latex PDF Service\n');
   
    
});

app.post('/job/:name', fuh, function (req, res) {
   // console.log(req.body);
   // console.log(req.files);
    console.log('Incoming Job with name: ' + req.params.name);
    for (var key in req.body)
        console.log(key);


    res.send(200, 'ok');


});

app.listen(3000);