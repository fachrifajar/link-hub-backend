"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller = require("../controller/post");
var middleware = require("../middleware/auth");
router.post("/add", middleware.validateToken, controller.addPost);
router.get("/", middleware.validateToken, controller.getPost);
router.get("/:post_id", controller.getPostSearch);
router.patch("/edit", middleware.validateToken, controller.editPost);
router.delete("/delete/:post_id", middleware.validateToken, controller.deletePost);
module.exports = router;
//# sourceMappingURL=post.js.map