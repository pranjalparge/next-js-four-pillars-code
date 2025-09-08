const express = require("express");
const asyncMiddleware = require("../../middleware/async");

const llp_About = require("../../models/99ideasLlp/eventsToGather");

//---------------------LLP Data-------------------------

module.exports.Add_llp = async (req, res) => {
  try {
    const data = await llp_About.create({
      page_heading: req.body.page_heading,
      page_meta: req.body.page_meta,
    });
    await data.save();
    res.json({ message: "about LLP data", data });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_llp_Data = asyncMiddleware(async (req, res) => {
  try {
    let getData = await llp_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

// for update data

module.exports.update_llp = asyncMiddleware(async (req, res) => {
  try {
    const data = await llp_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await llp_About.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      updateddata: mydata,
      msg: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error: ${error}`);
  }
});

//  for delete data
module.exports.delete_llp = asyncMiddleware(async (req, res) => {
  try {
    const data = await llp_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await llp_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});
