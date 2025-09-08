const express = require("express");
const asyncMiddleware = require("../middleware/async");

const Four_PII_About = require("../models/4pii_testiminial");
const krislin_About = require("../models/krislin_testiminial");
const LLC_About = require("../models/99ideas_testiminial");
const LLP_About = require("../models/LLp_testimonial");

// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  try {
    const data = await Four_PII_About.create({
      list1: req.body.list1,
      list2: req.body.list2,
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

// For Krislin About Data

module.exports.Add_krislin = async (req, res) => {
  try {
    const data = await krislin_About.create({
      list1: req.body.list1,
      list2: req.body.list2,
    });
    await data.save();
    res.json({ message: "about _krislin_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_krislin_Data = asyncMiddleware(async (req, res) => {
  const lang = req.query.lang;
  try {
    let getData = await krislin_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.update_krislin = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.id);
    const data = await krislin_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await krislin_About.findByIdAndUpdate(
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
module.exports.delete_krislin = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
    const data = await krislin_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await krislin_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

// for 99Ideas_LLP About Data

module.exports.Add_llp = async (req, res) => {
  try {
    const data = await LLP_About.create({
      list1: req.body.list1,
      list2: req.body.list2,
    });
    await data.save();
    res.json({ message: "about _99ideas_llp_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_llp_Data = asyncMiddleware(async (req, res) => {
  const lang = req.query.lang;
  try {
    let getData = await LLP_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.update_llp = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.id);
    const data = await LLP_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await LLP_About.findByIdAndUpdate(req.body.id, req.body, {
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

module.exports.delete_llp = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
    const data = await LLP_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await LLP_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

// for 99ideas LLC About Data

module.exports.Add_llc = async (req, res) => {
  try {
    const data = await LLC_About.create({
      list1: req.body.list1,
      list2: req.body.list2,
    });
    await data.save();
    res.json({ message: "about _99ideas_llc_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_llc_Data = asyncMiddleware(async (req, res) => {
  const lang = req.query.lang;
  try {
    let getData = await LLC_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.update_llc = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.id);
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await LLC_About.findByIdAndUpdate(req.body.id, req.body, {
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

module.exports.delete_llc = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
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
