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
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var ACC_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var REF_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
var client_1 = require("@prisma/client");
var uuid_1 = require("uuid");
var prisma = new client_1.PrismaClient();
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, pwd, existingUser, googleAuthValidate, hashedPwd, generatedUuid, usernameRandom, secretPwd, newUser, newUser, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.label = 1;
            case 1:
                _c.trys.push([1, 9, , 10]);
                _a = req.body, email = _a.email, username = _a.username, pwd = _a.pwd;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            OR: [{ email: email }, { username: username }],
                        },
                    })];
            case 2:
                existingUser = _c.sent();
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email },
                    })];
            case 3:
                googleAuthValidate = _c.sent();
                if (googleAuthValidate) {
                    throw { code: 400, message: "Email already registered" };
                }
                if (existingUser && (pwd === null || pwd === void 0 ? void 0 : pwd.length)) {
                    throw { code: 400, message: "Email or username is already taken" };
                }
                return [4 /*yield*/, bcrypt.hash(pwd, 10)];
            case 4:
                hashedPwd = _c.sent();
                generatedUuid = (0, uuid_1.v4)();
                usernameRandom = "firebase-".concat(generatedUuid);
                secretPwd = process.env.SECRET_PWD || "";
                if (!!(pwd === null || pwd === void 0 ? void 0 : pwd.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: email,
                            username: usernameRandom,
                            pwd: secretPwd,
                        },
                    })];
            case 5:
                newUser = _c.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, prisma.user.create({
                    data: {
                        email: email,
                        username: username,
                        pwd: hashedPwd,
                    },
                })];
            case 7:
                newUser = _c.sent();
                _c.label = 8;
            case 8:
                res.status(201).json({
                    message: "Success created new user: ".concat(email),
                });
                return [3 /*break*/, 10];
            case 9:
                error_1 = _c.sent();
                console.error(error_1);
                res.status((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.code) !== null && _b !== void 0 ? _b : 500).json({
                    message: error_1 || "Internal Server Error",
                });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, pwd, user, isPasswordValid, accessToken, refreshToken_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                _a = req.body, email = _a.email, pwd = _a.pwd;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email },
                    })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(401).json({ message: "Email not found" })];
                if (!(pwd !== process.env.SECRET_PWD)) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt.compare(pwd, user.pwd)];
            case 3:
                isPasswordValid = _b.sent();
                if (!isPasswordValid)
                    return [2 /*return*/, res.status(401).json({ message: "Invalid password" })];
                _b.label = 4;
            case 4:
                accessToken = jwt.sign({
                    id: user === null || user === void 0 ? void 0 : user.id,
                    name: user === null || user === void 0 ? void 0 : user.username,
                }, ACC_TOKEN_SECRET, { expiresIn: "15m" });
                refreshToken_1 = jwt.sign({
                    id: user === null || user === void 0 ? void 0 : user.id,
                    name: user === null || user === void 0 ? void 0 : user.username,
                }, REF_TOKEN_SECRET, { expiresIn: "1d" });
                res.cookie("ref", refreshToken_1, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    path: "/",
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    sameSite: "none",
                    secure: true,
                });
                return [4 /*yield*/, prisma.user.update({
                        where: { id: user === null || user === void 0 ? void 0 : user.id },
                        data: {
                            ref_token: refreshToken_1,
                            is_new_user: 1,
                        },
                    })];
            case 5:
                _b.sent();
                res.status(200).json({
                    message: "Login successfull!",
                    data: {
                        id: user === null || user === void 0 ? void 0 : user.id,
                        username: user === null || user === void 0 ? void 0 : user.username,
                        profile_picture: user === null || user === void 0 ? void 0 : user.profile_picture,
                        accessToken: accessToken,
                    },
                });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user_1, refreshToken_2, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { id: id },
                    })];
            case 1:
                user_1 = _a.sent();
                if (!user_1) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid ID" })];
                }
                refreshToken_2 = user_1.ref_token;
                if (!refreshToken_2) {
                    return [2 /*return*/, res.status(401).json({ message: "No refresh token found" })];
                }
                jwt.verify(refreshToken_2, REF_TOKEN_SECRET, function (err, decoded) {
                    if (err)
                        return res.status(401).json({ message: "Token Expired" });
                    var getRefreshToken = jwt.sign({
                        id: user_1 === null || user_1 === void 0 ? void 0 : user_1.id,
                        name: user_1 === null || user_1 === void 0 ? void 0 : user_1.username,
                    }, ACC_TOKEN_SECRET, { expiresIn: "1h" });
                    res.status(200).json({
                        message: "Successfully retrieved refresh token",
                        data: {
                            getRefreshToken: getRefreshToken,
                        },
                    });
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = { register: register, login: login, refreshToken: refreshToken };
//# sourceMappingURL=auth.js.map