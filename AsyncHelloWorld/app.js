var async = require('async');

async.each(['test1', 'test2', 'test3'], function (field, cb) {
    console.log('Async: ' + field);
});
