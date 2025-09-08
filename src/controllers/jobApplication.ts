const express = require("express");
const asyncMiddleware = require("../middleware/async");
const Joi = require("joi");
require("dotenv").config();
const mongoose = require("mongoose")
const {getMod,getCurrentUrl} = require("../config/db.js")

const Four_PII_About = require("../models/4pii.jobApplication");
const LLC_About = require("../models/99ideasLLc_jobApplication");
const saas_About = require("../models/99ideasSaas/saas_JobApplication");
const  {sendEmail}  = require("../utils/mail");
const maxSize = 50 * 1024;


module.exports.Add_4pii = async (req, res) => {
  let { error, value } = Joi.object({
    Full_Name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .error(new Error("first name must be valid!")),

    Phone: Joi.number().min(10).required(),
    Email_Address: Joi.string(),
    // .lowercase()
    // .email()
    // .required()
    // .error(new Error("Email must be valid!"))
    Experience: Joi.string(),
    Current_Company: Joi.string(),
    Current_CTC: Joi.string(),
    Expected_CTC: Joi.string(),
    Notice_Period: Joi.string(),
    Job_title: Joi.string(),
    gender : Joi.string(),
    resume: Joi.any(),
  }).validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  try {
    const basepath = process.env.BASE_PATH;
    let filename;
    if(!req.file) return res.status(400).json({message : "resume is required"})
    if(req.file){
      filename = req.file.filename
    }
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    
    const data = await  Four_PII_About.create({
      Full_Name: req.body.Full_Name,
      Email_Address: req.body.Email_Address,
      Phone: req.body.Phone,
      Current_Company: req.body.Current_Company?req.body.Current_Company:"",
      Current_CTC: req.body.Current_CTC?req.body.Current_CTC:"",
      Expected_CTC: req.body.Expected_CTC,
      Experience: req.body.Experience,
      Notice_Period: req.body.Notice_Period?req.body.Notice_Period:"",
      Job_title: req.body.Job_title,
      gender : req.body.gender
    });
    if (req.file) {
      data.resume = `${basepath}/uploads/${filename}`;
    }
    await data.save();
    await sendEmail(
      req.body.Email_Address,
      req.body.Full_Name,
      "Application for the job",
      "We have received your application for the job. We will get back to you soon."
    );
    // if(mode==1 || url==process.env.mongoReadOnlyURI){ 
    //   await mongoose.disconnect()
    //   mongoose.connect(url)
    // }
    await mongoose.disconnect()
    await mongoose.connect(url)
    return res.json({
      success : true,
      message: "about JobApplication page data of four pillers",
      data : data,
    });
  } catch (error) {
    res.send(error);
  }
};


module.exports.get_4pii_Data = asyncMiddleware(async (req, res) => {
  // const  lang = req.query.lang
  try {
    let getData = await Four_PII_About.find().sort({ _id: -1 });
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

// for update..data

module.exports.update_4pii = asyncMiddleware(async (req, res) => {
  try {
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
    res.status(400).json(`Error: ${error}`);
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

//-------------------99ideasLLC -----------------------

module.exports.Add_llc = async (req, res) => {
  let { error, value } = Joi.object({
    Full_Name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .error(new Error("first name must be valid!")),

    Phone: Joi.number().min(10).required(),
    Email_Address: Joi.string(),
    // .lowercase()
    // .email()
    // .required()
    // .error(new Error("Email must be valid!"))
    Experience: Joi.string(),
    Current_Company: Joi.string(),
    Current_CTC: Joi.string(),
    Expected_CTC: Joi.string(),
    Notice_Period: Joi.string(),
    Job_title: Joi.string(),
    gender : Joi.string(),
    resume: Joi.any(),
  }).validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  try {
    const basepath = process.env.BASE_PATH;
    let filename;
    if(!req.file) return res.status(400).json({message : "resume is required"})
    if(req.file){
      filename = req.file.filename
    }
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    
    const data = await LLC_About.create({
      Full_Name: req.body.Full_Name,
      Email_Address: req.body.Email_Address,
      Phone: req.body.Phone,
      Current_Company: req.body.Current_Company?req.body.Current_Company:"",
      Current_CTC: req.body.Current_CTC?req.body.Current_CTC:"",
      Expected_CTC: req.body.Expected_CTC,
      Experience: req.body.Experience,
      Notice_Period: req.body.Notice_Period?req.body.Notice_Period:"",
      Job_title: req.body.Job_title,
      gender : req.body.gender
    });
    if (req.file) {
      data.resume = `${basepath}/uploads/${filename}`;
    }
    await data.save();
    await sendEmail(
      req.body.Email_Address,
      req.body.Full_Name,
      "Application for the job",
      "We have received your application for the job. We will get back to you soon."
    );
    // if(mode==1 || url==process.env.mongoReadOnlyURI){ 
    //   await mongoose.disconnect()
    //   mongoose.connect(url)
    // }
    await mongoose.disconnect()
    await mongoose.connect(url)
    return res.json({
      success : true,
      message: "about JobApplication page data of four pillers",
      data : data,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports.get_llc = asyncMiddleware(async (req, res) => {
  try {
    let getData = await LLC_About.find().sort({ _id: -1 });
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

// for update..data

module.exports.update_llc = asyncMiddleware(async (req, res) => {
  try {
    const data = await Four_PII_About.findById(req.body.id);
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

//-----------------------SAAS DATA-------------------------------------

module.exports.Add_saas = async (req, res) => {
  let { error, value } = Joi.object({
    Full_Name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .error(new Error("first name must be valid!")),

    Phone: Joi.number().min(10).required(),
    Email_Address: Joi.string()
      .lowercase()
      .email()
      .required()
      .error(new Error("Email must be valid!")),
    Experience: Joi.string(),
    Current_Company: Joi.string(),
    Current_CTC: Joi.string(),
    Expected_CTC: Joi.string(),
    Notice_Period: Joi.string(),
    Job_title: Joi.string(),
    gender : Joi.string(),
    resume: Joi.any(),
  }).validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  try {
    const basepath = process.env.BASE_PATH;
    const filename = req.file.filename;
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await saas_About.create({
      Full_Name: req.body.Full_Name,
      Email_Address: req.body.Email_Address,
      Phone: req.body.Phone,
      Current_Company: req.body.Current_Company,
      Current_CTC: req.body.Current_CTC,
      Expected_CTC: req.body.Expected_CTC,
      Experience: req.body.Experience,
      Notice_Period: req.body.Notice_Period,
      Job_title: req.body.Job_title,
      gender : req.body.gender
    });
    if (req.file) {
      data.resume = `${basepath}/uploads/${filename}`;
    }
    await data.save();
    await sendEmail(
      req.body.Email_Address,
      req.body.Full_Name,
      "Application for the job",
      "We have received your application for the job. We will get back to you soon."
    );
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.json({
      message: "about JobApplication page data of four pillers",
      data,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_saas_Data = asyncMiddleware(async (req, res) => {
  try {
    let getData = await saas_About.find().sort({ _id: -1 });
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
