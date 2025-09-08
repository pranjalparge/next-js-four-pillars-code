const express = require("express");
const asyncMiddleware = require("../middleware/async");

const Four_PII_About = require("../models/4pii_New_Services_head");
const krislin_About = require("../models/Krislin_Service_Head");
const LLC_About = require("../models/LLC_Services_Head");
const saas_About = require("../models/99ideasSaas/saas_ServicesHead");
const LLP_About = require("../models/99ideasLLP_about");
const User = require("../models/User");

// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  try {
    const data = await Four_PII_About.create({
      page_heading: req.body.page_heading,
      content: req.body.content,
    });
    await data.save();
    res.json({ message: "about _4pii_services_page_data", data });
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

// For Krislin About Data

module.exports.Add_krislin = async (req, res) => {
  try {
    const data = await krislin_About.create({
      page_heading: req.body.page_heading,
      content: req.body.content,
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
      page_heading: req.body.page_heading,
      page_meta: req.body.page_meta,
      info1: req.body.info1,
      info2: req.body.info2,
      info3: req.body.info3,
      info_head1: req.body.info_head1,
      info_head2: req.body.info_head2,
      info_head3: req.body.info_head3,
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
    const newdata = await LLP_About.findOneAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

// for 99ideas LLC About Data

module.exports.Add_llc = async (req, res) => {
  try {
    const data = await LLC_About.create({
      page_heading: req.body.page_heading,
      content: req.body.content,
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
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await LLC_About.findOneAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

//-----------------SAAS DATA-------------------------

module.exports.Add_saas = async (req, res) => {
  try {
    const data = await saas_About.create({
      page_heading: req.body.page_heading,
      content: req.body.content,
    });

    await data.save();
    res.json({
      message: "about data of 99ideas saas",
      data,
    });
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

module.exports.update_saas = asyncMiddleware(async (req, res) => {
  try {
    const data = await saas_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await saas_About.findByIdAndUpdate(req.body.id, req.body, {
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

module.exports.delete_saas = asyncMiddleware(async (req, res) => {
  try {
    const data = await saas_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await saas_About.findOneAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});
