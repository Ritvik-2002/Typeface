const express = require("express");
const auth = require("../middleware/auth.middleware");
const upload = require("../config/multer");
const {
  uploadFile,
  getFiles,
  downloadFile,
} = require("../controllers/file.controller");

const router = express.Router();

router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/", auth, getFiles);
router.get("/:id/download", auth, downloadFile);

module.exports = router;
