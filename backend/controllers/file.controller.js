const File = require("../models/file.model");

//@desc Upload File
//@route POST /api/files/upload
//@access Private 

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = await File.create({
    filename: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    UserId: req.user.id,
  });

  res.json(file);
};


//@desc Get Files
//@route GET /api/files/
//@access Private 

exports.getFiles = async (req, res) => {
  const files = await File.findAll({
    where: { UserId: req.user.id },
  });
  res.json(files);
};

//@desc Download File
//@route POST /api/files/:id/download
//@access Private

exports.downloadFile = async (req, res) => {
  const file = await File.findOne({
    where: { id: req.params.id, UserId: req.user.id },
  });

  if (!file) {
    return res.status(403).json({ error: "Access denied" });
  }

  res.download(file.path, file.filename);
};
