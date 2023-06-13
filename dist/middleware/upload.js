"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var cloudinary = require("cloudinary");
var path = require("path");
var MB = 2;
var FILE_SIZE_LIMIT = MB * 1024 * 1024;
var filesPayLoadExist = function (req, res, next) {
    var _a;
    try {
        if (!req.files) {
            throw { code: 400, message: "Missing files" };
        }
        next();
    }
    catch (error) {
        res.status((_a = error === null || error === void 0 ? void 0 : error.code) !== null && _a !== void 0 ? _a : 500).json({
            message: error,
        });
    }
};
var fileSizeLimiter = function (req, res, next) {
    var _a;
    try {
        if (!req.files) {
            next();
        }
        else {
            var files_1 = req.files;
            var filesOverLimit_1 = [];
            Object.keys(files_1).forEach(function (key) {
                if (files_1[key].size > FILE_SIZE_LIMIT) {
                    filesOverLimit_1.push(files_1[key].name);
                }
            });
            if (filesOverLimit_1.length) {
                var properVerb = filesOverLimit_1.length > 1 ? "are" : "is";
                var sentence = "Upload failed. ".concat(filesOverLimit_1.toString(), " ").concat(properVerb, " over the file size limit of ").concat(MB, " MB.").replaceAll(",", ", ");
                var message = filesOverLimit_1.length < 3
                    ? sentence.replace(",", " and")
                    : sentence.replace(/,(?=[^,]*$)/, " and");
                throw { code: 413, message: message };
            }
            next();
        }
    }
    catch (error) {
        res.status((_a = error === null || error === void 0 ? void 0 : error.code) !== null && _a !== void 0 ? _a : 500).json({
            message: error,
        });
    }
};
var fileExtLimiter = function (allowedExtArray) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var files_2, fileExtensions_1, allowed, message;
        return __generator(this, function (_a) {
            if (!req.files) {
                next();
            }
            else {
                files_2 = req.files;
                fileExtensions_1 = [];
                Object.keys(files_2).forEach(function (key) {
                    fileExtensions_1.push(path.extname(files_2[key].name));
                });
                allowed = fileExtensions_1.every(function (ext) {
                    return allowedExtArray.includes(ext);
                });
                if (!allowed) {
                    message = "Upload failed. Only ".concat(allowedExtArray.toString(), " files allowed.").replaceAll(",", ", ");
                    res.status(422).json({ status: "error", message: message });
                    return [2 /*return*/];
                }
                next();
            }
            return [2 /*return*/];
        });
    }); };
};
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
module.exports = {
    filesPayLoadExist: filesPayLoadExist,
    fileSizeLimiter: fileSizeLimiter,
    fileExtLimiter: fileExtLimiter,
    cloudinary: cloudinary,
};
//# sourceMappingURL=upload.js.map