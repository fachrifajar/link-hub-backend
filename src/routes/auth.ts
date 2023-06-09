import express from "express";
const router = express.Router();
const controller = require("../controller/auth");
const middleware = require("../middleware/auth");

router.post("/register", middleware.registerValidator, controller.register);
router.post("/login", middleware.loginValidator, controller.login);
router.get("/refresh/:id", controller.refreshToken);
router.get("/refresh", controller.refreshToken2);

module.exports = router;
