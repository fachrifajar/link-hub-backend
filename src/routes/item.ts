import express from "express";
const router = express.Router();
const controller = require("../controller/item");
const middleware = require("../middleware/auth");

router.post("/add", middleware?.validateToken, controller?.addItem);

module.exports = router;
