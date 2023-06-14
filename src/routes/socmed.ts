import express from "express";
const router = express.Router();
const controller = require("../controller/socmed");
const middleware = require("../middleware/auth");

router.post("/add", middleware.validateToken, controller.addSocmed);

module.exports = router;