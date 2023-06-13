"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller = require("../controller/auth");
var middleware = require("../middleware/auth");
router.post("/register", middleware.registerValidator, controller.register);
router.post("/login", middleware.loginValidator, controller.login);
router.get("/refresh/:id", controller.refreshToken);
module.exports = router;
//# sourceMappingURL=auth.js.map