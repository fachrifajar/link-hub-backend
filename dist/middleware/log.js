"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logRequest = function (req, res, next) {
    console.log("Request running on Path:", req.originalUrl);
    console.log("Request type:", req.method);
    next();
};
var urlValidator = function (req, res) {
    res.status(404).json({
        message: "404",
    });
};
module.exports = { logRequest: logRequest, urlValidator: urlValidator };
//# sourceMappingURL=log.js.map