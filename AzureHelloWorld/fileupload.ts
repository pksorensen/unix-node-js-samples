/// <reference path="./Scripts/typings/express/express.d.ts" />
/// <reference path="./Scripts/typings/async/async.d.ts" />

import file = module('modules/fileupload_file');
import async = module('async');

export class FileUpload {
    private uploadDelegate: any;

    constructor(options) {
        this.uploadDelegate = options.adapter || new file.filesystem(options);
        console.log(this.uploadDelegate);
    }

    middleware(req: ExpressServerRequest, res: ExpressServerResponse, next) {
        if (typeof req.files === 'undefined' || Object.keys(req.files).length === 0) {
          return next()
        }
                
        async.each( Object.keys(req.files), (field, cb) => {
            var files = req.files[field],
                filesArray = [];

            if (!Array.isArray(files))
                files = [files];

            async.each(files, (file, cb1) => {
                filesArray = [];

                if (typeof file.path === 'undefined' || file.size === 0) {
                    return cb1(null);

                }
                console.log(this.uploadDelegate);
                this.uploadDelegate.put(file, function (error, storedFile) {
                    filesArray.push(storedFile);
                    cb1(null);
                });

            }, (err: string) => {     
                console.log(err);
                console.log(field);           
                console.log(filesArray);

                req.body[field] = filesArray;
                cb(null);

            });



        }, next);
    }
}




