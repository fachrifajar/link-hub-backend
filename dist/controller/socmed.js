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
var prisma = new client_1.PrismaClient();
var addSocmed = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, platform, url, post_id, getIdToken, addSocmed_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, platform = _a.platform, url = _a.url, post_id = _a.post_id;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.socialMedia.create({
                        data: {
                            platform: platform,
                            url: url,
                            post_id: post_id,
                            user_id: getIdToken,
                        },
                        select: {
                            platform: true,
                        },
                    })];
            case 2:
                addSocmed_1 = _b.sent();
                res.status(201).json({
                    message: "Success add new Platform: ".concat(addSocmed_1 === null || addSocmed_1 === void 0 ? void 0 : addSocmed_1.platform),
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var editSocmed = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, platform, url, socmed_id, getIdToken, validateSocmed, editSocmed_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, platform = _a.platform, url = _a.url, socmed_id = _a.socmed_id;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.socialMedia.findUnique({
                        where: { id: socmed_id },
                        select: {
                            user_id: true,
                        },
                    })];
            case 2:
                validateSocmed = _b.sent();
                if ((validateSocmed === null || validateSocmed === void 0 ? void 0 : validateSocmed.user_id) !== getIdToken) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "You cannot edit another user's post." })];
                }
                return [4 /*yield*/, prisma.socialMedia.update({
                        where: { id: socmed_id },
                        data: {
                            platform: platform,
                            url: url,
                        },
                    })];
            case 3:
                editSocmed_1 = _b.sent();
                res.status(201).json({
                    message: "Success edit Post",
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
var deleteSocmed = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var socmed_id, getIdToken, validateSocmed, deleteSocmed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                socmed_id = req.params.socmed_id;
                getIdToken = req.id;
                return [4 /*yield*/, prisma.socialMedia.findUnique({
                        where: { id: socmed_id },
                        select: {
                            user_id: true,
                        },
                    })];
            case 1:
                validateSocmed = _a.sent();
                if (!validateSocmed) {
                    return [2 /*return*/, res.status(400).json({ message: "socmed_id not found" })];
                }
                if ((validateSocmed === null || validateSocmed === void 0 ? void 0 : validateSocmed.user_id) !== getIdToken) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "You cannot delete another user's social media." })];
                }
                return [4 /*yield*/, prisma.socialMedia.delete({
                        where: { id: socmed_id },
                    })];
            case 2:
                deleteSocmed = _a.sent();
                res.status(202).json({
                    message: "Success delete social media",
                });
                return [2 /*return*/];
        }
    });
}); };
module.exports = { addSocmed: addSocmed, editSocmed: editSocmed, deleteSocmed: deleteSocmed };
//# sourceMappingURL=socmed.js.map