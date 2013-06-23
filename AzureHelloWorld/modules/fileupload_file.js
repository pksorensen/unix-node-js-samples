var fs = require('fs');
var path = require('path');


var async = require('async');

var mime = require('mime');

var filesystem = (function () {
    function filesystem(uploaddir) {
        this.uploaddir = uploaddir;
        async.waterfall([
            function (callback) {
                fs.stat(uploaddir, function (error) {
                    callback(null, error);
                });
            },
            function (error, callback) {
                if (error && error.code === 'ENOENT')
                    fs.mkdir(uploaddir, '0755', callback);
            },
            function (error) {
                if (error) {
                    console.log(error);
                    throw error;
                }
            }
        ]);
    }
    filesystem.prototype.put = function (file, callback) {
        var _this = this;
        async.waterfall([
            function (callback) {
                if (typeof file === 'string') {
                    var fileType = mime.lookup(file), size;

                    _this.getFileHash(file, function (error, name) {
                        if (error)
                            return callback(error);

                        fs.stat(file, function (error, stats) {
                            if (error && error.code === 'ENOENT')
                                return callback(error);

                            size = stats.size;
                            file = fs.createReadStream(file);
                            file.name = path.basename(file.path);
                            file.type = fileType;
                            file.size = size;
                            callback(null, name);
                        });
                    });
                } else {
                    _this.getFileHash(file.path, callback);
                }
            },
            function (name, callback) {
                fs.mkdir(path.join(_this.uploaddir, name), '0755', function () {
                    var tempLocation = file.path, destPath = path.join(_this.uploaddir, name, file.name);

                    file = {
                        size: file.size,
                        type: file.type,
                        path: name + '/',
                        basename: file.name
                    };

                    fs.stat(destPath, function (error, stats) {
                        if (error && error.code === 'ENOENT') {
                            var readFile = fs.createReadStream(tempLocation), writeFile = fs.createWriteStream(destPath, { flags: 'w' });

                            readFile.pipe(writeFile);
                            readFile.on('end', function () {
                                callback(null, file);
                            });
                        } else if (stats && stats.isFile()) {
                            callback(null, file);
                        } else {
                            callback(error);
                        }
                    });
                });
            }
        ], callback);
    };
    filesystem.prototype.get = function (file, callback) {
    };
    filesystem.prototype.getAsReadStream = function (file, callback) {
    };
    filesystem.prototype.remove = function (file, callback) {
    };

    filesystem.prototype.getFileHash = function (filepath, callback) {
    };
    return filesystem;
})();
exports.filesystem = filesystem;

