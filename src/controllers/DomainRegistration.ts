const express = require("express");
const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const saas_About = require("../models/99ideasSaas/saas_DomainRegistration");

module.exports.Add_saas = async (req, res) => {
    try {
      const basepath = process.env.SAAS_BASEPATH;
      const filename = req.file.path;
  
      const data = await saas_About.create({
        info: req.body.info,
        info_head: req.body.info_head,
      });
      if (req.file) {
        data.image = `${basepath}${filename}`;
      }
      await data.save();
      res.json({ message: "about _99ideas_saas_data", data });
      console.log(data);
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