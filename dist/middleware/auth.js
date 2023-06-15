"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var Validator = require("node-input-validator").Validator;
var jwt = require("jsonwebtoken");
var ACC_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var loginValidator = function (req, res, next) {
    var rules = new Validator(req.body, {
        email: "required|email",
        pwd: "required",
    });
    rules.check().then(function (matched) {
        if (matched) {
            next();
        }
        else {
            res.status(422).json({
                message: rules.errors,
            });
        }
    });
};
var registerValidator = function (req, res, next) {
    var rules = new Validator(req.body, {
        email: "required|email",
        // pwd: "required",
        // username: "required",
    });
    rules.check().then(function (matched) {
        if (matched) {
            next();
        }
        else {
            res.status(422).json({
                message: rules.errors,
            });
        }
    });
};
var validateToken = function (req, res, next) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", "")) &&
        ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.token) &&
        ((_d = req === null || req === void 0 ? void 0 : req.cookies) === null || _d === void 0 ? void 0 : _d.token)) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    var token = ((_f = (_e = req === null || req === void 0 ? void 0 : req.headers) === null || _e === void 0 ? void 0 : _e.authorization) === null || _f === void 0 ? void 0 : _f.replace("Bearer ", "")) ||
        ((_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.token) ||
        ((_h = req === null || req === void 0 ? void 0 : req.cookies) === null || _h === void 0 ? void 0 : _h.token);
    try {
        jwt.verify(token, ACC_TOKEN_SECRET, function (err, decoded) {
            if (err)
                return res.status(401).json({ message: "Token Expired" });
            req.id = decoded.id;
            req.name = decoded.name;
            next();
        });
        // const decoded = await new Promise((resolve, reject) => {
        //   jwt.verify(token, ACC_TOKEN_SECRET, (err: any, decoded: any) => {
        //     if (err) reject(err);
        //     resolve(decoded);
        //   });
        // }) as { id: string; name: string };
        // (req as any).id = decoded.id;
        // (req as any).name = decoded.name;
        // next();
        // const decoded = jwt.verify(token, ACC_TOKEN_SECRET) as {
        //   id: string;
        //   name: string;
        // };
        // (req as any).id = decoded.id;
        // (req as any).name = decoded.name;
        // next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
module.exports = { loginValidator: loginValidator, registerValidator: registerValidator, validateToken: validateToken };
//# sourceMappingURL=auth.js.map