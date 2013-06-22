/// <reference path="./Scripts/typings/express/express.d.ts" />

import express = module("express");

var app = express();


app.get('/testUrl', function (req, res) {
    console.log('test url ' + req.query['testQS']);
    res.send(200,'ok');
});

app.get('/testUrl/:folder', function (req, res) {
    console.log('testing folder ' + req.params.folder);
    res.send(200, 'ok');

});

app.listen(80);