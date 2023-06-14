"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller = require("../controller/socmed");
var middleware = require("../middleware/auth");
router.post("/add", middleware.validateToken, controller.addSocmed);
router.patch("/edit", middleware.validateToken, controller.editSocmed);
router.delete("/delete/:socmed_id", middleware.validateToken, controller.deleteSocmed);
module.exports = router;
//# sourceMappingURL=socmed.js.map