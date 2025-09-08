const express = require("express");
// const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const asyncMiddleware = require("../../middleware/async");

// const llp_About = require("../../models/99ideasLlp/eventManagement");

const LLC_About = require("../../models/99ideasLLC_innerPages/onlineAdmission");

module.exports.Add_llc = async (req, res) => {
  try {
    const filename = req.file.path;
    // const filename = req.file.filename;
    const basepath = process.env.BASE_PATH;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;

    const data = await LLC_About.create({
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

module.exports.get_llc_Data = asyncMiddleware(async (req, res) => {
  try {
    let getData = await LLC_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

//  for delete data
module.exports.delete_llc = asyncMiddleware(async (req, res) => {
  try {
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await LLC_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

module.exports.update_llc = asyncMiddleware(async (req, res) => {
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
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }

    const mydata = await LLC_About.findByIdAndUpdate(req.body.id, record, {
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
