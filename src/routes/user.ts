import express from "express";
const router = express.Router();
const controller = require("../controller/user.ts");
const middleware = require("../middleware/auth");
const middlewareUpload = require("../middleware/upload");

router.patch(
  "/edit",
  middleware.validateToken,
  middlewareUpload.fileExtLimiter([
    ".png",
    ".jpg",
    ".jpeg",
    ".PNG",
    ".JPG",
    ".JPEG",
  ]),
  middlewareUpload.fileSizeLimiter,
  controller.editProfile
);

module.exports = router;
