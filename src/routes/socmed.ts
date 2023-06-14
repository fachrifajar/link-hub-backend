import express from "express";
const router = express.Router();
const controller = require("../controller/socmed");
const middleware = require("../middleware/auth");

router.post("/add", middleware.validateToken, controller.addSocmed);
router.patch("/edit", middleware.validateToken, controller.editSocmed);
router.delete(
  "/delete/:socmed_id",
  middleware.validateToken,
  controller.deleteSocmed
);

module.exports = router;
