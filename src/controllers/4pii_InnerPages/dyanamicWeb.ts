const express = require("express");
// const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const asyncMiddleware = require("../../middleware/async");

// const llp_About = require("../../models/99ideasLlp/eventManagement");

const Four_PII_About = require("../../models/4pii_InnerPages/dynamicWeb");

// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  try {
    const filename = req.file.path;
    // const filename = req.file.filename;
    const basepath = process.env.BASE_PATH;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;

    const data = await Four_PII_About.create({
      info: req.body.info,
      info_head: req.body.info_head,
    });

    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    console.log(req.file);
    await data.save();
    res.status(200).json({ message: "about _4pii_data", data });
    // console.log(data)
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_4pii_Data = asyncMiddleware(async (req, res) => {
  try {
    let getData = await Four_PII_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

//  for delete data
module.exports.delete_4pii = asyncMiddleware(async (req, res) => {
  try {
    const data = await Four_PII_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await Four_PII_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

module.exports.update_4pii = asyncMiddleware(async (req, res) => {
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
    console.log(req.body);
    const data = await Four_PII_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }

    const mydata = await Four_PII_About.findByIdAndUpdate(req.body.id, record, {
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
