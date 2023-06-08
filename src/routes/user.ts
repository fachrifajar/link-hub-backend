import express from "express";
const router = express.Router();
const controller = require("../controller/user.ts");
const middleware = require("../middleware/auth");

router.patch("/edit", middleware.validateToken, controller.editProfile);

module.exports = router;
