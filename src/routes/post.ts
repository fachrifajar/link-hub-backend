import express from "express";
const router = express.Router();
const controller = require("../controller/post");
const middleware = require("../middleware/auth");

router.post("/add", middleware.validateToken, controller.addPost);

module.exports = router;
