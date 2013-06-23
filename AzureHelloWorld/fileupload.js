var file = require("./modules/fileupload_file");
var async = require('async');

var FileUpload = (function () {
    function FileUpload(options) {
        this.uploadDelegate = options.adapter || new file.filesystem(options);
        console.log(this.uploadDelegate);
    }
    FileUpload.prototype.middleware = function (req, res, next) {
        var _this = this;
        if (typeof req.files === 'undefined' || Object.keys(req.files).length === 0) {
            return next();
        }

        async.each(Object.keys(req.files), function (field, cb) {
            var files = req.files[field], filesArray = [];

            if (!Array.isArray(files))
                files = [files];

            async.each(files, function (file, cb1) {
                filesArray = [];

                if (typeof file.path === 'undefined' || file.size === 0) {
                    return cb1(null);
                }
                console.log(_this.uploadDelegate);
                _this.uploadDelegate.put(file, function (error, storedFile) {
                    filesArray.push(storedFile);
                    cb1(null);
                });
            }, function (err) {
                console.log(err);
                console.log(field);
                console.log(filesArray);

                req.body[field] = filesArray;
                cb(null);
            });
        }, next);
    };
    return FileUpload;
})();
exports.FileUpload = FileUpload;

