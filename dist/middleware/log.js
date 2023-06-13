"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlValidator = exports.logRequest = void 0;
var logRequest = function (req, res, next) {
    console.log("Request running on Path:", req.originalUrl);
    console.log("Request type:", req.method);
    next();
};
exports.logRequest = logRequest;
var urlValidator = function (req, res) {
    res.status(404).json({
        message: "404",
    });
};
exports.urlValidator = urlValidator;
//# sourceMappingURL=log.js.map