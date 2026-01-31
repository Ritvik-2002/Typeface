const multer = require("multer");

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "text/plain",
    "application/json",
    "application/zip",
    "application/x-zip-compressed",
  ];

  if (!allowed.includes(file.mimetype)) {
    return cb(
      new Error("File type not supported"),
      false
    );
  }

  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
