"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readStringFromFile = exports.readJSONFromFile = exports.fileExists = void 0;
var fs = require("fs");
var fileExists = function (filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return true;
        }
    }
    catch (err) {
        console.error(err);
    }
    return false;
};
exports.fileExists = fileExists;
var readJSONFromFile = function (filePath) {
    return JSON.parse(exports.readStringFromFile(filePath));
};
exports.readJSONFromFile = readJSONFromFile;
var readStringFromFile = function (filePath) {
    return fs.readFileSync(filePath).toString();
};
exports.readStringFromFile = readStringFromFile;
