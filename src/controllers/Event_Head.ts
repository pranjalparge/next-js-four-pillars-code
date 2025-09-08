const express = require("express");
const asyncMiddleware = require("../middleware/async");

const Four_PII_About = require("../models/4pii_event_head");


// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  try {
    const data = await Four_PII_About.create({
      page_heading: req.body.page_heading,
      page_meta: req.body.page_meta,
    });
    await data.save();
    res.json({ message: "about _4pii_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_4pii_Data = asyncMiddleware(async (req, res) => {
  // const  lang = req.query.lang
  try {
    let getData = await Four_PII_About.find();
    // getResult=getResult[0];
    // getData = getData[0];
    // // res.status(200).json({result:getResult[getResult.length-1]})
    // res.status(200).json({result:getData[getData.length-1]})
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

// for update..data

module.exports.update_4pii = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.id);
    const data = await Four_PII_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }

    const mydata = await Four_PII_About.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
module.exports.delete_4pii = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
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
