const express = require("express");
const asyncMiddleware = require("../middleware/async");

const { sendEmail } = require("../utils/mail");
const { sendEnquiryEmail } = require("../utils/krislin_Enquiry");
const Four_PII_About = require("../models/4PII_Enquiry");
const Krislin_About = require("../models/Krislin_Enquiry");
const LLC_About = require("../models/99ideasLLC_Enquiry");
const saas_About = require("../models/99ideasSaas/saas_Enquiry");
const llp_About = require("../models/LLP_Enquiry");
const { Emailsend } = require("../utils/krislin_Enquiry");
const {getMod,getCurrentUrl} = require("../config/db")
const mongoose = require("mongoose")
// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  try {
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await Four_PII_About.create({
      Full_Name: req.body.name,
      email: req.body.email,

      // Phone: req.body.Phone?req.body.Phone:"",
      Organisation: req.body.Organisation?req.body.Organisation:"",
      Address: req.body.Address?req.body.Address:"",
      City: req.body.City?req.body.City:"",
      State: req.body.State?req.body.State:"",
      Country: req.body.Country?req.body.Country:"",
      Services: req.body.subject,
      message: req.body.message,
    });

    await data.save();

    await sendEmail(
    req.body.email,
    req.body.name,
    "Your request has been received",
    "We will get back to you soon."
  );
  await mongoose.disconnect()
    await mongoose.connect(url)
    res.json({ message: "about _4pii_data", data });
    // await sendEmail(data.email);
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

// for LLP

module.exports.Add_llp = async (req, res) => {
  try {
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await llp_About.create({
      Full_Name: req.body.Full_Name,
      email: req.body.email,
      Phone: req.body.Phone,
      Organisation: req.body.Organisation,
      Address: req.body.Address,
      City: req.body.City,
      State: req.body.State,
      Country: req.body.Country,
      Services: req.body.Services,
      message: req.body.message,
    });

    await data.save();

    await sendEmail(req.body.email);
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.json({ message: "about LLP data", data });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_llp_Data = asyncMiddleware(async (req, res) => {
  // const  lang = req.query.lang
  try {
    let getData = await llp_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

// for update..data

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
    console.log(req.body.id);
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

// for Krislin

module.exports.Add_Krislin = async (req, res) => {

  try {
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await Krislin_About.create({
      Full_Name: req.body.Full_Name,
      email: req.body.email,

      Phone: req.body.Phone,
      // Organisation: req.body.Organisation,
      Address: req.body.Address,
      City: req.body.City,
      State: req.body.State,
      Country: req.body.Country,
      // Services: req.body.Services,
      message: req.body.message,
    });

    await data.save();
    // await email(req.body.email)

    await sendEmail(req.body.email);

    // await sendEnquiryEmail(req.body.email)

    // await Emailsend(req.body.email)
    await mongoose.disconnect()
    await mongoose.connect(url)
    return res.status(200).json({success : true, message: "about _Krislin_Enquiry", data });

    // await sendEmail(data.email);

    console.log(data);

    // if(data){
    //     await EmailSend(req.body.Full_Name , req.body.Email_Address)
    // }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_krislin_Data = asyncMiddleware(async (req, res) => {
  // const  lang = req.query.lang
  try {
    let getData = await Krislin_About.find();
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

module.exports.update_krislin = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.id);
    const data = await Krislin_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }

    const mydata = await Krislin_About.findByIdAndUpdate(
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
module.exports.delete_krislin = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
    const data = await Krislin_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    const newdata = await Krislin_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

//-------------------99Ideas LLc -------------------------

module.exports.Add_llc = async (req, res) => {
  try {
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await LLC_About.create({
      Full_Name: req.body.Full_Name,
      email: req.body.email,
      Phone: req.body.Phone,
      Organisation: req.body.Organisation,
      Address: req.body.Address,
      City: req.body.City,
      State: req.body.State,
      Country: req.body.Country,
      Services: req.body.Services,
      message: req.body.message,
    });
    await data.save();
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.json({ message: "about 99ideasLLC_data", data });
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

// for update..data

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
    const newdata = await Four_PII_About.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

//--------------------------SAAS DATA-------------------------------

module.exports.Add_saas = async (req, res) => {
  try {
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await saas_About.create({
      Full_Name: req.body.name,
      email: req.body.email,
      Phone: req.body.Phone?req.body.Phone:"",
      Organisation: req.body.Organisation?req.body.Organisation:"",
      Address: req.body.Address?req.body.Address:"",
      City: req.body.City?req.body.City:"",
      State: req.body.State?req.body.State:"",
      Country: req.body.Country?req.body.Country:"",
      Services: req.body.subject,
      message: req.body.message,
    });
    await data.save();
    await sendEmail(
      req.body.email,
      req.body.name,
      "Your request has been received",
      "We will get back to you soon."
    );
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.json({ message: "about _99ideas_saas_data", data });
    // console.log(data);
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
