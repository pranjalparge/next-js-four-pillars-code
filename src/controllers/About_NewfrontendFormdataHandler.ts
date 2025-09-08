const {
  about_NewfrontendFormdataModel,llc_contact,llp_contact,saas_contact
} = require("../models/About_NewfrontendFormdata");
const  {sendEmail}  = require("../utils/mail");
const basepath = process.env.BASE_PATH;
const joi = require("joi")
const {getMod,getCurrentUrl} = require("../config/db")
const mongoose = require("mongoose");
const Joi = require("joi");

module.exports.handleGetData = async (req, res) => {
  try {
    const data = await about_NewfrontendFormdataModel.find({}).sort({ _id: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.handleCreateNewData = async (req, res) => {
  let {error,value}=joi.object({
    name : joi.string()
    .trim()
    .min(3)
    .max(33)
    .required()
    .pattern(/^[A-Za-z\s]+$/)
    .error(new Error("name is required")),
    email : joi.string()
    .trim()
    .required()
    .lowercase()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/),
    subject : joi.string()
    .trim()
    .required(),
    message : joi.string()
    .trim()
    .required(),
    phone : Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      'number.base': 'Phone must be a number',
      'number.min': 'Phone must be at least 10 digits',
      'number.max': 'Phone must be at most 10 digits',
      'any.required': 'Phone number is required',
    })
  }).validate(req.body)
  if(error) return res.status(400).json({message : error.message})
  try {
    const body = req.body;
    if (!body) return res.send({ mssg: "data is missing" });
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await about_NewfrontendFormdataModel.create({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      phone : body.phone
    });

    if(!data) return res.status(500).json({message : "internal server error"})
    await sendEmail(
      body.email,
      body.name,
      "Your request has been received",
      "We will get back to you soon."
    );
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.status(200).send({ msg: "data saved succesfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};


module.exports.handleUpdateData = async (req, res) => {
  let { error, value } = joi
    .object({
      name: joi
        .string()
        .trim()
        .min(3)
        .max(33)
        .pattern(/^[A-Za-z\s]+$/)
        .error(new Error("Invalid name format")),
      email: joi
        .string()
        .trim()
        .lowercase()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)
        .error(new Error("Invalid email format")),
      subject: joi.string().trim(),
      message: joi.string().trim(),
    })
    .validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  try {
    const id  = req.query.id;
    const updateData = req.body;

    if (!id) return res.status(400).json({ message: "ID is required" });
    
    const existingData = await about_NewfrontendFormdataModel.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    const updatedEntry = await about_NewfrontendFormdataModel.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedEntry) return res.status(500).json({ message: "Failed to update data" });

    res.status(200).json({ msg: "Data updated successfully", data: updatedEntry });
  } catch (error) {
    console.error("Error updating data", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.handleDeleteData = async (req, res) => {
  try {
    const  id  = req.query.id;
    console.log(id);
    
    if (!id) return res.status(400).json({ message: "ID is required" });

    const existingData = await about_NewfrontendFormdataModel.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    await about_NewfrontendFormdataModel.findByIdAndDelete(id);

    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).send("Internal server error");
  }
};




//// LLC


module.exports.llChandleGetData = async (req, res) => {
  try {
    const data = await llc_contact.find({}).sort({ _id: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.llChandleCreateNewData = async (req, res) => {
  let {error,value}=joi.object({
    name : joi.string()
    .trim()
    .min(3)
    .max(33)
    .required()
    .pattern(/^[A-Za-z\s]+$/)
    .error(new Error("name is required")),
    email : joi.string()
    .trim()
    .required()
    .lowercase()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/),
    subject : joi.string()
    .trim()
    .required(),
    message : joi.string()
    .trim()
    .required(),
    phone : Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      'number.base': 'Phone must be a number',
      'number.min': 'Phone must be at least 10 digits',
      'number.max': 'Phone must be at most 10 digits',
      'any.required': 'Phone number is required',
    })
  }).validate(req.body)
  if(error) return res.status(400).json({message : error.message})
  try {
    const body = req.body;
    if (!body) return res.send({ mssg: "data is missing" });
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await llc_contact.create({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      phone : body.phone
    });

    if(!data) return res.status(500).json({message : "internal server error"})
    await sendEmail(
      body.email,
      body.name,
      "Your request has been received",
      "We will get back to you soon."
    );
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.status(200).send({ msg: "data saved succesfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};


module.exports.llChandleUpdateData = async (req, res) => {
  let { error, value } = joi
    .object({
      name: joi
        .string()
        .trim()
        .min(3)
        .max(33)
        .pattern(/^[A-Za-z\s]+$/)
        .error(new Error("Invalid name format")),
      email: joi
        .string()
        .trim()
        .lowercase()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)
        .error(new Error("Invalid email format")),
      subject: joi.string().trim(),
      message: joi.string().trim(),
    })
    .validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  try {
    const id  = req.query.id;
    const updateData = req.body;

    if (!id) return res.status(400).json({ message: "ID is required" });
    
    const existingData = await llc_contact.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    const updatedEntry = await llc_contact.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedEntry) return res.status(500).json({ message: "Failed to update data" });

    res.status(200).json({ msg: "Data updated successfully", data: updatedEntry });
  } catch (error) {
    console.error("Error updating data", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.llChandleDeleteData = async (req, res) => {
  try {
    const  id  = req.query.id;
    console.log(id);
    
    if (!id) return res.status(400).json({ message: "ID is required" });

    const existingData = await llc_contact.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    await llc_contact.findByIdAndDelete(id);

    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).send("Internal server error");
  }
};

//  LLP



module.exports.llPhandleGetData = async (req, res) => {
  try {
    const data = await llp_contact.find({}).sort({ _id: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.llPhandleCreateNewData = async (req, res) => {
  let {error,value}=joi.object({
    name : joi.string()
    .trim()
    .min(3)
    .max(33)
    .required()
    .pattern(/^[A-Za-z\s]+$/)
    .error(new Error("name is required")),
    email : joi.string()
    .trim()
    .required()
    .lowercase()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/),
    subject : joi.string()
    .trim()
    .required(),
    message : joi.string()
    .trim()
    .required(),
    phone : Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      'number.base': 'Phone must be a number',
      'number.min': 'Phone must be at least 10 digits',
      'number.max': 'Phone must be at most 10 digits',
      'any.required': 'Phone number is required',
    })
  }).validate(req.body)
  if(error) return res.status(400).json({message : error.message})
  try {
    const body = req.body;
    if (!body) return res.send({ mssg: "data is missing" });
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await llp_contact.create({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      phone : body.phone
    });

    if(!data) return res.status(500).json({message : "internal server error"})
    await sendEmail(
      body.email,
      body.name,
      "Your request has been received",
      "We will get back to you soon."
    );
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.status(200).send({ msg: "data saved succesfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};


module.exports.llPhandleUpdateData = async (req, res) => {
  let { error, value } = joi
    .object({
      name: joi
        .string()
        .trim()
        .min(3)
        .max(33)
        .pattern(/^[A-Za-z\s]+$/)
        .error(new Error("Invalid name format")),
      email: joi
        .string()
        .trim()
        .lowercase()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)
        .error(new Error("Invalid email format")),
      subject: joi.string().trim(),
      message: joi.string().trim(),
    })
    .validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  try {
    const id  = req.query.id;
    const updateData = req.body;

    if (!id) return res.status(400).json({ message: "ID is required" });
    
    const existingData = await llp_contact.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    const updatedEntry = await llp_contact.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedEntry) return res.status(500).json({ message: "Failed to update data" });

    res.status(200).json({ msg: "Data updated successfully", data: updatedEntry });
  } catch (error) {
    console.error("Error updating data", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.llPhandleDeleteData = async (req, res) => {
  try {
    const  id  = req.query.id;
    console.log(id);
    
    if (!id) return res.status(400).json({ message: "ID is required" });

    const existingData = await llp_contact.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    await llp_contact.findByIdAndDelete(id);

    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).send("Internal server error");
  }
};

//// SAAAS




module.exports.saashandleGetData = async (req, res) => {
  try {
    const data = await saas_contact.find({}).sort({ _id: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.saashandleCreateNewData = async (req, res) => {
  let {error,value}=joi.object({
    name : joi.string()
    .trim()
    .min(3)
    .max(33)
    .required()
    .pattern(/^[A-Za-z\s]+$/)
    .error(new Error("name is required")),
    email : joi.string()
    .trim()
    .required()
    .lowercase()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/),
    subject : joi.string()
    .trim()
    .required(),
    message : joi.string()
    .trim()
    .required(),
    phone : Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      'number.base': 'Phone must be a number',
      'number.min': 'Phone must be at least 10 digits',
      'number.max': 'Phone must be at most 10 digits',
      'any.required': 'Phone number is required',
    })
  }).validate(req.body)
  if(error) return res.status(400).json({message : error.message})
  try {
    const body = req.body;
    if (!body) return res.send({ mssg: "data is missing" });
    const mode = await getMod()
    const url = getCurrentUrl()
    
    const uri = (mode==1 || url==process.env.mongoReadOnlyURI)?process.env.mongoURI:url

    await mongoose.disconnect()
    await mongoose.connect(uri)
    const data = await saas_contact.create({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      phone : body.phone
    });

    if(!data) return res.status(500).json({message : "internal server error"})
    await sendEmail(
      body.email,
      body.name,
      "Your request has been received",
      "We will get back to you soon."
    );
    await mongoose.disconnect()
    await mongoose.connect(url)
    res.status(200).send({ msg: "data saved succesfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
};


module.exports.saashandleUpdateData = async (req, res) => {
  let { error, value } = joi
    .object({
      name: joi
        .string()
        .trim()
        .min(3)
        .max(33)
        .pattern(/^[A-Za-z\s]+$/)
        .error(new Error("Invalid name format")),
      email: joi
        .string()
        .trim()
        .lowercase()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)
        .error(new Error("Invalid email format")),
      subject: joi.string().trim(),
      message: joi.string().trim(),
    })
    .validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  try {
    const id  = req.query.id;
    const updateData = req.body;

    if (!id) return res.status(400).json({ message: "ID is required" });
    
    const existingData = await saas_contact.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    const updatedEntry = await saas_contact.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedEntry) return res.status(500).json({ message: "Failed to update data" });

    res.status(200).json({ msg: "Data updated successfully", data: updatedEntry });
  } catch (error) {
    console.error("Error updating data", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.saashandleDeleteData = async (req, res) => {
  try {
    const  id  = req.query.id;
    console.log(id);
    
    if (!id) return res.status(400).json({ message: "ID is required" });

    const existingData = await saas_contact.findById(id);
    if (!existingData) return res.status(404).json({ message: "Data not found" });

    await llc_contact.findByIdAndDelete(id);

    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).send("Internal server error");
  }
};
