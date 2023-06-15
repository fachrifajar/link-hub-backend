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
var addItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, url, post_id, getIdToken, validateItem, _i, _b, i, addItem_1, error_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.label = 1;
            case 1:
                _e.trys.push([1, 4, , 5]);
                _a = req.body, title = _a.title, url = _a.url, post_id = _a.post_id;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.post.findUnique({
                        where: { id: post_id },
                        select: {
                            user_id: true,
                            Item: {
                                select: {
                                    title: true,
                                },
                            },
                        },
                    })];
            case 2:
                validateItem = _e.sent();
                if (!validateItem)
                    return [2 /*return*/, res.status(400).json({ message: "post_id not found" })];
                if (((_c = validateItem === null || validateItem === void 0 ? void 0 : validateItem.Item) === null || _c === void 0 ? void 0 : _c.length) === 10)
                    return [2 /*return*/, res.status(400).json({
                            message: "You have reached the maximum limit of items. Only 10 items are allowed per post.",
                        })];
                if ((validateItem === null || validateItem === void 0 ? void 0 : validateItem.user_id) !== getIdToken) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "You cannot add item from another user's post" })];
                }
                for (_i = 0, _b = validateItem === null || validateItem === void 0 ? void 0 : validateItem.Item; _i < _b.length; _i++) {
                    i = _b[_i];
                    if (((_d = i === null || i === void 0 ? void 0 : i.title) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === title.toLowerCase()) {
                        return [2 /*return*/, res.status(400).json({ message: "Title already exists." })];
                    }
                }
                return [4 /*yield*/, prisma.item.create({
                        data: {
                            title: title,
                            url: url,
                            post_id: post_id,
                            user_id: getIdToken,
                        },
                    })];
            case 3:
                addItem_1 = _e.sent();
                res.status(201).json({
                    message: "Success add aew Item, from Post: ".concat(post_id),
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _e.sent();
                console.log(error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var editItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, url, item_id, getIdToken, validateItem, editItem_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, title = _a.title, url = _a.url, item_id = _a.item_id;
                getIdToken = req.id;
                console.log(item_id);
                return [4 /*yield*/, prisma.item.findUnique({
                        where: { id: item_id },
                        select: {
                            user_id: true,
                        },
                    })];
            case 2:
                validateItem = _b.sent();
                if (!validateItem)
                    return [2 /*return*/, res.status(400).json({ message: "item_id not found" })];
                if ((validateItem === null || validateItem === void 0 ? void 0 : validateItem.user_id) !== getIdToken) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "You cannot edit another user's item." })];
                }
                return [4 /*yield*/, prisma.item.update({
                        where: { id: item_id },
                        data: {
                            title: title,
                            url: url,
                        },
                    })];
            case 3:
                editItem_1 = _b.sent();
                res.status(201).json({
                    message: "Success edit Item: ".concat(item_id),
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getIdToken, post_id, post, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                getIdToken = req.id;
                post_id = req.params.post_id;
                return [4 /*yield*/, prisma.item.findMany({
                        where: { post_id: post_id },
                        select: {
                            id: true,
                            title: true,
                            url: true,
                            created_at: true,
                            updated_at: true,
                        },
                    })];
            case 1:
                post = _a.sent();
                res.status(200).json({
                    message: "Success get user Item",
                    data: {
                        total: post === null || post === void 0 ? void 0 : post.length,
                        post: post,
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
var deleteItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item_id, getIdToken, validatePost, deletePost, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                item_id = req.params.item_id;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.item.findUnique({
                        where: { id: item_id },
                        select: {
                            user_id: true,
                        },
                    })];
            case 1:
                validatePost = _a.sent();
                if (!validatePost)
                    return [2 /*return*/, res.status(400).json({ message: "item_id not found" })];
                if ((validatePost === null || validatePost === void 0 ? void 0 : validatePost.user_id) !== getIdToken) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "You cannot delete another user's post." })];
                }
                return [4 /*yield*/, prisma.item.delete({
                        where: { id: item_id },
                    })];
            case 2:
                deletePost = _a.sent();
                res.status(202).json({
                    message: "Success delete Item",
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports = { addItem: addItem, editItem: editItem, getItem: getItem, deleteItem: deleteItem };
//# sourceMappingURL=item.js.map