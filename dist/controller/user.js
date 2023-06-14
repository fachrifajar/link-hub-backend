"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var client_1 = require("@prisma/client");
var cloudinary = require("../middleware/upload").cloudinary;
var uuidv4 = require("uuid").v4;
var prisma = new client_1.PrismaClient();
var editProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, description, profile_picture, post_picture, getIdToken, user, existingProfilePicture, existingPostPicture, getProfilePicture, getPostPicture, profilePictureCloudinary_1, postPictureCloudinary_1, updatedUser, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.label = 1;
            case 1:
                _d.trys.push([1, 12, , 13]);
                _a = req.body, username = _a.username, description = _a.description, profile_picture = _a.profile_picture, post_picture = _a.post_picture;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: getIdToken },
                        select: {
                            username: true,
                            description: true,
                            profile_picture: true,
                            post_picture: true,
                        },
                    })];
            case 2:
                user = _d.sent();
                existingProfilePicture = user === null || user === void 0 ? void 0 : user.profile_picture;
                existingPostPicture = user === null || user === void 0 ? void 0 : user.post_picture;
                getProfilePicture = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.profile_picture;
                getPostPicture = (_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.post_picture;
                if (!req.files) return [3 /*break*/, 10];
                if (!existingPostPicture) return [3 /*break*/, 4];
                return [4 /*yield*/, cloudinary.v2.uploader.destroy(existingPostPicture, { folder: "link-hub" }, function (error, result) {
                        if (error) {
                            throw error;
                        }
                    })];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4:
                if (!existingProfilePicture) return [3 /*break*/, 6];
                return [4 /*yield*/, cloudinary.v2.uploader.destroy(existingProfilePicture, { folder: "link-hub" }, function (error, result) {
                        if (error) {
                            throw error;
                        }
                    })];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6:
                if (!getProfilePicture) return [3 /*break*/, 8];
                return [4 /*yield*/, cloudinary.v2.uploader.upload(getProfilePicture.tempFilePath, { public_id: uuidv4(), folder: "link-hub" }, function (error, result) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (error) {
                                    throw error;
                                }
                                profilePictureCloudinary_1 = result === null || result === void 0 ? void 0 : result.public_id;
                                return [2 /*return*/];
                            });
                        });
                    })];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8:
                if (!getPostPicture) return [3 /*break*/, 10];
                return [4 /*yield*/, cloudinary.v2.uploader.upload(getPostPicture.tempFilePath, { public_id: uuidv4(), folder: "link-hub" }, function (error, result) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (error) {
                                    throw error;
                                }
                                postPictureCloudinary_1 = result === null || result === void 0 ? void 0 : result.public_id;
                                return [2 /*return*/];
                            });
                        });
                    })];
            case 9:
                _d.sent();
                _d.label = 10;
            case 10: return [4 /*yield*/, prisma.user.update({
                    where: { id: getIdToken },
                    data: {
                        username: username ? username.toLowerCase() : user === null || user === void 0 ? void 0 : user.username,
                        description: description ? description : user === null || user === void 0 ? void 0 : user.description,
                        profile_picture: getProfilePicture
                            ? profilePictureCloudinary_1
                            : user === null || user === void 0 ? void 0 : user.profile_picture,
                        post_picture: getPostPicture
                            ? postPictureCloudinary_1
                            : user === null || user === void 0 ? void 0 : user.post_picture,
                    },
                })];
            case 11:
                updatedUser = _d.sent();
                res.status(200).json({
                    message: "Success update profile",
                    data: __assign(__assign({}, req.body), { profilePictureCloudinary: profilePictureCloudinary_1, postPictureCloudinary: postPictureCloudinary_1 }),
                });
                return [3 /*break*/, 13];
            case 12:
                error_1 = _d.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
var deletePicture = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, profile_picture, post_picture, getIdToken, user, existingProfilePicture, existingPostPicture, updatedUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                _a = req.body, profile_picture = _a.profile_picture, post_picture = _a.post_picture;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: getIdToken },
                        select: {
                            username: true,
                            description: true,
                            profile_picture: true,
                            post_picture: true,
                        },
                    })];
            case 2:
                user = _b.sent();
                existingProfilePicture = user === null || user === void 0 ? void 0 : user.profile_picture;
                existingPostPicture = user === null || user === void 0 ? void 0 : user.post_picture;
                if (!profile_picture && !post_picture)
                    return [2 /*return*/, res.status(400).json({ message: "Please pick options to delete" })];
                if (!post_picture) return [3 /*break*/, 4];
                return [4 /*yield*/, cloudinary.v2.uploader.destroy(existingPostPicture, { folder: "link-hub" }, function (error, result) {
                        if (error) {
                            throw error;
                        }
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!profile_picture) return [3 /*break*/, 6];
                return [4 /*yield*/, cloudinary.v2.uploader.destroy(existingProfilePicture, { folder: "link-hub" }, function (error, result) {
                        if (error) {
                            throw error;
                        }
                    })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, prisma.user.update({
                    where: { id: getIdToken },
                    data: {
                        profile_picture: profile_picture ? null : existingProfilePicture,
                        post_picture: post_picture ? null : existingPostPicture,
                    },
                })];
            case 7:
                updatedUser = _b.sent();
                res.status(202).json({
                    message: "Success Delete Picture",
                    data: {
                        profile_picture: profile_picture ? "deleted" : null,
                        post_picture: post_picture ? "deleted" : null,
                    },
                });
                return [3 /*break*/, 9];
            case 8:
                error_2 = _b.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
var getProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getIdToken, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                getIdToken = req.id;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: getIdToken },
                        select: {
                            profile_picture: true,
                            username: true,
                            // posts: {
                            //   select: {
                            //     id: true,
                            //   },
                            // },
                            // Item: {
                            //   select: {
                            //     title: true,
                            //     url: true,
                            //   },
                            // },
                        },
                    })];
            case 1:
                user = _a.sent();
                // const postCount = user?.posts?.length;
                res.status(200).json({
                    message: "Success get user profile",
                    data: {
                        profile_picture: user === null || user === void 0 ? void 0 : user.profile_picture,
                        // post_count: postCount,
                    },
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = { editProfile: editProfile, deletePicture: deletePicture, getProfile: getProfile };
//# sourceMappingURL=user.js.map