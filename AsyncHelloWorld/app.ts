/// <reference path="./Scripts/typings/node/node.d.ts" />

var async = require('async');

async.each(['test1', 'test2', 'test3'], (field, cb) => {
    console.log('Async: ' + field);
});

