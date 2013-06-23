/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="../Scripts/typings/async/async.d.ts" />

import fs = module('fs');
import path = module('path');
import crypto = module('crypto');


import async = module('async');


var mime = require('mime');





export class filesystem {

    private uploaddir: string;

    constructor(uploaddir) {
        this.uploaddir = uploaddir;
        async.waterfall([
            (callback) => {
                fs.stat(uploaddir, (error) => {
                    callback(null, error);
                })
            },
            (error, callback) => {
                if (error && error.code === 'ENOENT')
                    fs.mkdir(uploaddir, '0755', callback);
            },
            (error) => {
                if (error)
                {
                    console.log(error);
                    throw error
                }
            }

        ]);
    }

    put(file, callback) {
        async.waterfall([
            (callback) => {
                // Checking if the file is a path
                if (typeof file === 'string') {
                    var fileType = mime.lookup(file)
                        , size;

                    this.getFileHash(file, (error, name) => {
                        if (error) return callback(error);

                        fs.stat(file, (error: any, stats) => {
                            if (error && error.code === 'ENOENT')
                                return callback(error);


                            size = stats.size
                              file = fs.createReadStream(file)
                              file.name = path.basename(file.path)
                              file.type = fileType
                              file.size = size
                              callback(null, name)
                        });
                    });
                } else {
                    this.getFileHash(file.path, callback)
                }
            },
            (name, callback) => {
                fs.mkdir(path.join(this.uploaddir, name), '0755', () => {
                    var tempLocation = file.path
                        , destPath = path.join(this.uploaddir, name, file.name);

                    file =
                    {
                        size: file.size
                        , type: file.type
                        , path: name + '/'
                        , basename: file.name
                    };

                    fs.stat(destPath, (error: any, stats) => {
                        // If the file doesn't exist, create it
                        if (error && error.code === 'ENOENT') {
                            var readFile = fs.createReadStream(tempLocation)
                                , writeFile = fs.createWriteStream(destPath, { flags: 'w' })

                            readFile.pipe(writeFile)
                            readFile.on('end', () => {
                                callback(null, file)
                            });

                            // If the file does exist, just pass back the file details
                        } else if (stats && stats.isFile()) {
                            callback(null, file)

                        // If there was an error that wasn't a non-existent file, return it
                        } else {
                            callback(error)
                        }
                    })
                })
             }
        ], callback);

    }
    get(file, callback) {

    }
    getAsReadStream(file, callback) {

    }
    remove(file, callback) {

    }

    getFileHash(filepath, callback) {

    }
}

