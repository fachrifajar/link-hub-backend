import express from "express";
const router = express.Router();
const controller = require("../controller/item");
const middleware = require("../middleware/auth");

router.post("/add", middleware?.validateToken, controller?.addItem);
router.patch("/edit", middleware?.validateToken, controller?.editItem);
router.get("/:post_id", middleware?.validateToken, controller?.getItem);
router.delete(
  "/delete/item_id",
  middleware?.validateToken,
  controller?.deleteItem
);

module.exports = router;
