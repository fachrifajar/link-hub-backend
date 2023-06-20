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
var client_1 = require("@prisma/client");
var uuidv4 = require("uuid").v4;
var prisma = new client_1.PrismaClient();
var addPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getIdToken, _a, title, bg_color, validateCountPost, addPost_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                getIdToken = req.id;
                _a = req.body, title = _a.title, bg_color = _a.bg_color;
                return [4 /*yield*/, prisma.post.findMany({
                        where: { user_id: getIdToken },
                        select: {
                            title: true,
                        },
                    })];
            case 2:
                validateCountPost = _b.sent();
                if (validateCountPost.length === 3)
                    return [2 /*return*/, res.status(400).json({
                            message: "You have reached the maximum limit of posts. Only 3 posts are allowed per user.",
                        })];
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: title,
                            bg_color: bg_color,
                            user_id: getIdToken,
                        },
                        select: {
                            id: true,
                        },
                    })];
            case 3:
                addPost_1 = _b.sent();
                res.status(201).json({
                    message: "Success add new Post: ".concat(addPost_1 === null || addPost_1 === void 0 ? void 0 : addPost_1.id),
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getIdToken, post, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                getIdToken = req.id;
                return [4 /*yield*/, prisma.post.findMany({
                        where: { user_id: getIdToken },
                        select: {
                            id: true,
                            title: true,
                            bg_color: true,
                            url: true,
                            created_at: true,
                            updated_at: true,
                            items: true,
                            SocialMedia: {
                                select: {
                                    id: true,
                                    platform: true,
                                    url: true,
                                },
                            },
                        },
                    })];
            case 1:
                post = _a.sent();
                res.status(200).json({
                    message: "Success get user Post",
                    data: {
                        post: post,
                    },
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var editPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, post_id, bg_color, items, bg, bg_direction, button_option, button_color, button_font_color, font_color, use_title, getIdToken, validatePost, updateData, editPost_1, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, title = _a.title, post_id = _a.post_id, bg_color = _a.bg_color, items = _a.items, bg = _a.bg, bg_direction = _a.bg_direction, button_option = _a.button_option, button_color = _a.button_color, button_font_color = _a.button_font_color, font_color = _a.font_color, use_title = _a.use_title;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.post.findUnique({
                        where: { id: post_id },
                        select: {
                            user_id: true,
                        },
                    })];
            case 2:
                validatePost = _b.sent();
                if (!validatePost) {
                    return [2 /*return*/, res.status(400).json({ message: "post_id not found" })];
                }
                if ((validatePost === null || validatePost === void 0 ? void 0 : validatePost.user_id) !== getIdToken) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "You cannot edit another user's post." })];
                }
                updateData = {};
                console.log(use_title);
                console.log(typeof use_title);
                if (title) {
                    updateData.title = title;
                }
                if (bg_color) {
                    updateData.bg_color = bg_color;
                }
                if (items) {
                    updateData.items = items.split(",");
                }
                if (bg) {
                    updateData.bg = bg;
                }
                if (bg_direction) {
                    updateData.bg_direction = bg_direction;
                }
                if (button_option) {
                    updateData.button_option = button_option;
                }
                if (button_color) {
                    updateData.button_color = button_color;
                }
                if (button_font_color) {
                    updateData.button_font_color = button_font_color;
                }
                if (font_color) {
                    updateData.font_color = font_color;
                }
                if (use_title) {
                    updateData.use_title = use_title;
                }
                return [4 /*yield*/, prisma.post.update({
                        where: { id: post_id },
                        data: updateData,
                    })];
            case 3:
                editPost_1 = _b.sent();
                res.status(201).json({
                    message: "Success edit Post",
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post_id, getIdToken, validatePost, deletePost_1, deleteItems, deletePost_2, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                post_id = req.params.post_id;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.post.findUnique({
                        where: { id: post_id },
                        select: {
                            user_id: true,
                            Item: {
                                select: {
                                    post_id: true,
                                },
                            },
                        },
                    })];
            case 1:
                validatePost = _b.sent();
                if (!validatePost) {
                    return [2 /*return*/, res.status(400).json({ message: "post_id not found" })];
                }
                if ((validatePost === null || validatePost === void 0 ? void 0 : validatePost.user_id) !== getIdToken) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "You cannot delete another user's post." })];
                }
                if (!!((_a = validatePost === null || validatePost === void 0 ? void 0 : validatePost.Item) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.post.delete({
                        where: { id: post_id },
                    })];
            case 2:
                deletePost_1 = _b.sent();
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, prisma.item.deleteMany({
                    where: { post_id: post_id },
                })];
            case 4:
                deleteItems = _b.sent();
                return [4 /*yield*/, prisma.post.delete({
                        where: { id: post_id },
                    })];
            case 5:
                deletePost_2 = _b.sent();
                _b.label = 6;
            case 6:
                res.status(202).json({
                    message: "Success delete Post",
                });
                return [3 /*break*/, 8];
            case 7:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
module.exports = { addPost: addPost, getPost: getPost, editPost: editPost, deletePost: deletePost };
//# sourceMappingURL=post.js.map