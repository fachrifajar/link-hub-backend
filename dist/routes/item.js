"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller = require("../controller/item");
var middleware = require("../middleware/auth");
router.post("/add", middleware === null || middleware === void 0 ? void 0 : middleware.validateToken, controller === null || controller === void 0 ? void 0 : controller.addItem);
router.patch("/edit", middleware === null || middleware === void 0 ? void 0 : middleware.validateToken, controller === null || controller === void 0 ? void 0 : controller.editItem);
router.get("/:post_id", middleware === null || middleware === void 0 ? void 0 : middleware.validateToken, controller === null || controller === void 0 ? void 0 : controller.getItem);
router.delete("/delete/:item_id", middleware === null || middleware === void 0 ? void 0 : middleware.validateToken, controller === null || controller === void 0 ? void 0 : controller.deleteItem);
module.exports = router;
//# sourceMappingURL=item.js.map