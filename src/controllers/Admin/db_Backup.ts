// const express = require("express");
// const asyncMiddleware = require("../../middleware/async");
// require("dotenv").config();

// const BackupModel = require("../../models/Admin/db_Backup");

// const Joi = require("joi");

// // for 4PIII About Data

// module.exports.backup = async (req, res) => {
//   let {error,value}= Joi.object({
//     username : Joi.string(),
//     password : Joi.string(),
//     host : Joi.string(),
   
//   }).validate(req.body)
//   if(error){
//     console.log(error)
//     return res.status(400).json({success : false,message : error.message})
//   }
//   try {

//     const basepath = process.env.BASE_PATH;
//     const data = await BackupModel.create({
//       username: req.body.username,
//       password: req.body.password,
//       host: req.body.host,
//       file : req.files && Array.isArray(req.files.file) &&req.files?.file[0]?.filename? `${basepath}/uploads/${req.files?.file[0]?.filename}`: "",
     

//     });


//     res.status(200).json({success : true, data });
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// };
const express = require("express");
// const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const BackupModel = require("../../models/Admin/db_Backup");

const Joi = require("joi");
const {upload_to_ftp_server}= require('../../utils/ftp')

// for 4PIII About Data

// module.exports.backup = async (req, res) => {
//   let {error,value}= Joi.object({
//     username : Joi.string(),
//     password : Joi.string(),
//     host : Joi.string(),
   
//   }).validate(req.body)
//   if(error){
//     console.log(error)
//     return res.status(400).json({success : false,message : error.message})
//   }
//   try {

//     const basepath = process.env.BASE_PATH;
//     const data = await BackupModel.create({
//       username: req.body.username,
//       password: req.body.password,
//       host: req.body.host,
//       file : req.files && Array.isArray(req.files.file) &&req.files?.file[0]?.filename? `${basepath}/uploads/${req.files?.file[0]?.filename}`: "",
     

//     });


//     res.status(200).json({success : true, data });
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// };


module.exports.backup = async (req, res) => {
  let { error, value } = Joi.object({
    // username: Joi.string(),
    // password: Joi.string(),
    // host: Joi.string(),
    file : Joi.any()
  }).validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const basepath = process.env.BASE_PATH;
    const uploadedFile = req.files && Array.isArray(req.files.file) && req.files?.file[0];

    const fileUrl = uploadedFile?.filename ? `${basepath}/uploads/${uploadedFile.filename}` : "";

    const data = await BackupModel.create({
      // username: req.body.username,
      // password: req.body.password,
      // host: req.body.host,
      file: fileUrl,
    });

    // ✅ Upload to FTP
    if (uploadedFile?.filename && uploadedFile?.path) {
      await upload_to_ftp_server(uploadedFile.path, uploadedFile.filename);
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};

