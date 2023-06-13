"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller = require("../controller/user.ts");
var middleware = require("../middleware/auth");
var middlewareUpload = require("../middleware/upload");
router.patch("/edit", middleware.validateToken, middlewareUpload.fileExtLimiter([
    ".png",
    ".jpg",
    ".jpeg",
    ".PNG",
    ".JPG",
    ".JPEG",
]), middlewareUpload.fileSizeLimiter, controller.editProfile);
router.patch("/images/delete", middleware.validateToken, controller.deletePicture);
module.exports = router;
//# sourceMappingURL=user.js.map