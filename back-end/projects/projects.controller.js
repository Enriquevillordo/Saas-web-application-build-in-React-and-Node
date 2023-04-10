const express = require("express");
const multer = require("multer");
const router = express.Router();
const Joi = require("joi");
const validateReq = require("middleware/validate-request");
const projectService = require("./project.service");
const upload = require("../middleware/upload");

// routes
router.get("/", get);
router.post("/", getByUserIdAndFolderId);
router.post("/create", createSchema, create);
// router.post("/uploadVideo", upload.single("file"), uploadVideo);
router.post("/uploadVideo", function (request, response, next) {
  var storage = multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, "./upload");
    },
    filename: function (request, file, cb) {
      var temp_file_arr = file.originalname.split(".");

      var temp_file_name = temp_file_arr[0];

      var temp_file_extension = temp_file_arr[1];

      cb(null, temp_file_name + "-" + Date.now() + "." + temp_file_extension);
    },
  });

  var upload = multer({ storage: storage }).single("sample_image");
  console.log(storage.DiskStorage);
  upload(request, response, function (error) {
    if (error) {
      console.log(error);
      return response.end("Error Uploading File");
    } else {
      return response.end("File is uploaded successfully");
    }
  });
});

module.exports = router;

function get(req, res, next) {
  projectService
    .get(req.params.userID)
    .then((result) => {
      res.json({
        success: result.success,
        message: result.message,
        projects: result.projects,
      });
    })
    .catch(next);
}

function getByUserIdAndFolderId(req, res, next) {
  projectService
    .getByUserIdAndFolderId(req.body.userId, req.body.folderId)
    .then((result) => {
      res.json({
        success: result.success,
        message: result.message,
        projects: result.projects,
      });
    })
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    folder_id: Joi.number().required(),
    project_name: Joi.string().required(),
    video_file_path: Joi.string().required(),
    subtitle_file_path: Joi.string().required(),
  });
  validateReq(req, res, next, schema);
}

function create(req, res, next) {
  projectService
    .create(req.body)
    .then((project) => {
      res.json({
        success: project.success,
        message: project.message,
      });
    })
    .catch(next);
}

function uploadVideo(req, res, next) {
  console.log(JSON.stringify(req.body.files[0]));
  console.log(req.files, "-----------req.files");
  console.log(req.body.files, "-------file-----------");
  if (!req.body.files) {
    //If the file is not uploaded, then throw custom error with message: FILE_MISSING
    throw Error("FILE_MISSING");
  } else {
    //If the file is uploaded, then send a success response.
    res.send({ success: true });
  }
}
