const express = require("express");
// const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const asyncMiddleware = require("../../middleware/async");

const saas_About = require("../../models/99ideasSAAS_innerPages/loadBalance");

module.exports.Add_saas = async (req, res) => {
  try {
    const filename = req.file.path;
    // const filename = req.file.filename;
    const basepath = process.env.BASE_PATH;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;

    const data = await saas_About.create({
      info: req.body.info,
      info_head: req.body.info_head,
    });

    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    await data.save();
    res.status(200).json({ message: "about _4pii_data", data });
    // console.log(data)
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_saas_Data = asyncMiddleware(async (req, res) => {
  try {
    let getData = await saas_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

//  for delete data
module.exports.delete_saas = asyncMiddleware(async (req, res) => {
  try {
    const data = await saas_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await saas_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

module.exports.update_saas = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.file);
    // const filename = req.file.filename;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;

    if (req.file) {
      var filename = req.file.path;
      var basepath = `https://4pillarsinfotechindia.com/api/`;
      //   var filename = req.file.filename;
      //   var basepath = `${req.protocol}://${req.get("host")}/uploads/`;
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
        image: `${basepath}${filename}`,
      };
    } else {
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
      };
    }
    // console.log(req.params.id)
    
    const data = await saas_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }

    const mydata = await saas_About.findByIdAndUpdate(req.body.id, record, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      updateddata: mydata,
      msg: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error: ${error}`);
  }
});
