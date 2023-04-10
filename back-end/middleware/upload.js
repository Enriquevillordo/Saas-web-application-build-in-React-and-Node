const multer = require("multer");
const storage = multer.diskStorage({
  //Specify the destination directory where the file needs to be saved
  destination: function (req, file, cb) {
    console.log("hello");
    cb(null, "./upload");
  },
  //Specify the name of the file. The date is prefixed to avoid overwriting of files.
  filename: function (req, file, cb) {
    console.log(file, "__________________");
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  //   fileFilter: (req, file, cb) => {
  //     if (
  //       file.mimetype == "video/mp4" ||
  //       file.mimetype == "video/mov" ||
  //       file.mimetype == "video/avi" ||
  //       file.mimetype == "video/flv" ||
  //       file.mimetype == "video/webm"
  //     ) {
  //       cb(null, true);
  //     } else {
  //       cb(null, false);
  //       return cb(new Error("INVALID_TYPE"));
  //     }
  //   },
});

// function upload(req, res, next) {
//   multer({
//     storage: storage,
//   });
//   next();
// }

console.log(upload.single, "-------------upload");

module.exports = upload;
