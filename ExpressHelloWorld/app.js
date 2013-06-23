define(["require", "exports", "express"], function(require, exports, __express__) {
    /// <reference path="./Scripts/typings/node/node.d.ts" />
    /// <reference path="./Scripts/typings/express/express.d.ts" />
    var express = __express__;
    var app = express();

    app.get('/testUrl', function (req, res) {
        console.log('test url ' + req.query['testQS']);
        res.send(200, 'ok');
    });

    app.get('/testUrl/:folder', function (req, res) {
        console.log('testing folder ' + req.params.folder);
        res.send(200, 'ok');
    });

    app.listen(80);
});
//@ sourceMappingURL=app.js.map
