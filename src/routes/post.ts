import express from "express";
const router = express.Router();
const controller = require("../controller/post");
const middleware = require("../middleware/auth");

router.post("/add", middleware.validateToken, controller.addPost);
router.get("/:post_id?", middleware.validateToken, controller.getPost);
router.patch("/edit", middleware.validateToken, controller.editPost);
router.delete(
  "/delete/:post_id",
  middleware.validateToken,
  controller.deletePost
);

module.exports = router;
