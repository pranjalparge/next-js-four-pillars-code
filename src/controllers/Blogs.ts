const express = require("express");
const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const Four_PII_About = require("../models/4pii_blog");
const krislin_About = require("../models/Krislin_Blog");
const LLC_About = require("../models/LLC_Blog");
const LLP_About = require("../models/LLP_About");
const saas_About = require("../models/99ideasSaas/saas_Blog");
const Joi = require("joi");

// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  let {error,value}= Joi.object({
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // const filename = req.file.path;
    // const filename = req.file.filename;
    // const basepath = process.env.BASE_PATH;
    // const basepath = `${req.protocol}://${req.get("host")}/uploads/`;
    // console.log(req.body)
    const basepath = process.env.BASE_PATH;
    try {
      const data = await Four_PII_About.create({
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        authorName: req.body.authorName,
        createdAt: req.body.createdAt,
        description2 : req.body.description2,
        readingTime : req.body.readingTime,
        image : req.files && Array.isArray(req.files.bgImage) &&req.files?.bgImage[0]?.filename? `${basepath}/uploads/${req.files?.bgImage[0]?.filename}`: "",
        authorPicture : req.files && Array.isArray(req.files.authImage) && req.files?.authImage[0]?.filename? `${basepath}/uploads/${req.files?.authImage[0]?.filename}` : "",
        hide : req.body.hide?req.body.hide:0
      });
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }

    // if(data.code==8000) return res.status(500).json({success : false,message : "database is in readonly mode"})
    // if (req.files) {
    //   data.image = req.files.bgImage? `${basepath}/uploads/${req.files?.bgImage[0]?.path}` : "";
    //   data.authorPicture = req.files.autImage? `${basepath}/uploads/${req.files?.autImage[0]?.path}` : ""
    // }
    // console.log(req.file);
    // await data.save({validateBeforeSave : false});
    return res.status(200).json({success : true, message : "data created successfully"});
    // console.log(data)
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_4pii_Data = asyncMiddleware(async (req, res) => {
  try {
    let getData = await Four_PII_About.find();

    // getData = getData[0];

    // res.status(200).json({result:getData[getData.length-1]})
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

// for update..data

// module.exports.update_4pii = asyncMiddleware( async(req,res)=>{
//     try{
//         // console.log(req.params.id)
//         console.log(req.body)
//         const data = await Four_PII_About.findById(req.body.id)
//         if (!data) {
//             res.status(400).json({ success: false, message: 'data  not exits' });
//         }

//         const mydata = await Four_PII_About.findByIdAndUpdate(req.body.id, req.body, {
//             new: true,
//             runValidators: true,
//         });

//         return res.status(200).json({ success: true, updateddata: mydata, message: 'Successfully updated' });

//     }catch(error){
//         console.log(error)
//         res.status(400).json(`Error: ${error}`)

//     }

// })

//  for delete data
module.exports.delete_4pii = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.body.id);
    const data = await Four_PII_About.findById(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    try {
      const newdata = await Four_PII_About.findByIdAndDelete(req.body.id);
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }
    res.status(200).json({ success: true, message: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

module.exports.update_4pii = asyncMiddleware(async (req, res) => {
  let {error,value}= Joi.object({
    id : Joi.string().required(),
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // console.log(req.file);
    // const filename = req.file.filename;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;
    const obj = await Four_PII_About.findById(req.body.id)
    if(!obj) return res.status(400).json({ success: false, message: "data  not exits" });
    
      // var filename = req.file.path;
      // var basepath = `https://4pillarsinfotechindia.com/api/`;
      const basepath = process.env.BASE_PATH;
      //   var filename = req.file.filename;
      //   var basepath = `${req.protocol}://${req.get("host")}/uploads/`;
      // console.log(req.files)
      var record = {
        title: req.body.title?req.body.title:obj.title,
        content: req.body.content?req.body.content:obj.content,
        description: req.body.description?req.body.description:obj.description,
        authorName: req.body.authorName?req.body.authorName:obj.authorName,
        createdAt: req.body.createdAt?req.body.createdAt:obj.createdAt,
        description2 : req.body.description2?req.body.description2:obj.description2,
        image: req.files && Array.isArray(req.files.bgImage)?`${basepath}/uploads/${req.files.bgImage[0].filename}`:obj.image==undefined?"":obj.image,
        // image : req.body.bImage,
        authorPicture : req.files && Array.isArray(req.files.autImage)?`${basepath}/uploads/${req.files.autImage[0].filename}`:obj.image==undefined?"":obj.authorPicture,
        readingTime : req.body.readingTime?req.body.readingTime:obj.readingTime,
        hide : req.body.hide?req.body.hide:obj.hide
      };
    // console.log(req.params.id)
    // console.log(req.body);
    // const data = await Four_PII_About.findById(req.body.id);
    // if (!data) {
    //   res.status(400).json({ success: false, message: "data  not exits" });
    // }

    try {
      const mydata = await Four_PII_About.findByIdAndUpdate(req.body.id, record, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }

    return res.status(200).json({
      success: true,
      // updateddata: mydata,
      message: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error: ${error}`);
  }
});

// For Krislin About Data

module.exports.Add_krislin = async (req, res) => {
  let {error,value}= Joi.object({
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    const basepath = process.env.BASE_PATH;
    try {
      const data = await krislin_About.create({
        title: req.body.title,
          content: req.body.content,
          description: req.body.description,
          authorName: req.body.authorName,
          createdAt: req.body.createdAt,
          description2 : req.body.description2,
          readingTime : req.body.readingTime,
          image : req.files && Array.isArray(req.files.bgImage) &&req.files?.bgImage[0]?.filename? `${basepath}/uploads/${req.files?.bgImage[0]?.filename}`: "",
          authorPicture : req.files && Array.isArray(req.files.authImage) && req.files?.authImage[0]?.filename? `${basepath}/uploads/${req.files?.authImage[0]?.filename}` : "",
          hide : req.body.hide?req.body.hide:0
      });
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }

    // if (req.file) {
    //   data.image = req.file.path;
    // }
    // console.log(req.file);
    // await data.save();
    return res.status(200).json({success : true, message: "new blog created" });
    // console.log(data);
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
  let {error,value}= Joi.object({
    id : Joi.string().required(),
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // console.log(req.params.id);
    // console.log(req.body.id);
    // const data = await krislin_About.findById(req.body.id);
    // if (!data) {
    //   res.status(400).json({ success: false, message: "data  not exits" });
    // }
    const basepath = process.env.BASE_PATH;
    const obj = await krislin_About.findById(req.body.id)
    if(!obj) return res.status(400).json({ success: false, message: "data  not exits" });
    var record = {
      title: req.body.title?req.body.title:obj.title,
      content: req.body.content?req.body.content:obj.content,
      description: req.body.description?req.body.description:obj.description,
      authorName: req.body.authorName?req.body.authorName:obj.authorName,
      createdAt: req.body.createdAt?req.body.createdAt:obj.createdAt,
      description2 : req.body.description2?req.body.description2:obj.description2,
      image: req.files && Array.isArray(req.files.bgImage)?`${basepath}/uploads/${req.files.bgImage[0].filename}`:obj.image==undefined?"":obj.image,
      // image : req.body.bImage,
      authorPicture : req.files && Array.isArray(req.files.autImage)?`${basepath}/uploads/${req.files.autImage[0].filename}`:obj.image==undefined?"":obj.authorPicture,
      readingTime : req.body.readingTime?req.body.readingTime:obj.readingTime,
      hide : req.body.hide?req.body.hide:obj.hide
    };
    try {
      const mydata = await krislin_About.findByIdAndUpdate(
        req.body.id,
        record,
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }
    res.status(200).json({
      success: true,
      // updateddata: mydata,
      message: "Successfully updated",
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
   try {
    const newdata = await krislin_About.findByIdAndDelete(req.body.id);
   } catch (error) {
    console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
   }
    res.status(200).json({ success: true, message: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

// for 99Ideas_LLP About Data

module.exports.Add_llp = async (req, res) => {
  let {error,value}= Joi.object({
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // const filename = req.file.path;
    // const filename = req.file.filename;
    // const basepath = process.env.BASE_PATH;
    // const basepath = `${req.protocol}://${req.get("host")}/uploads/`;
    // console.log(req.body)
    const basepath = process.env.BASE_PATH;
    try {
      const data = await LLP_About.create({
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        authorName: req.body.authorName,
        createdAt: req.body.createdAt,
        description2 : req.body.description2,
        readingTime : req.body.readingTime,
        image : req.files && Array.isArray(req.files.bgImage) &&req.files?.bgImage[0]?.filename? `${basepath}/uploads/${req.files?.bgImage[0]?.filename}`: "",
        authorPicture : req.files && Array.isArray(req.files.authImage) && req.files?.authImage[0]?.filename? `${basepath}/uploads/${req.files?.authImage[0]?.filename}` : "",
        hide : req.body.hide?req.body.hide:0
      });
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }

    // if (req.files) {
    //   data.image = req.files.bgImage? `${basepath}/uploads/${req.files?.bgImage[0]?.path}` : "";
    //   data.authorPicture = req.files.autImage? `${basepath}/uploads/${req.files?.autImage[0]?.path}` : ""
    // }
    // console.log(req.file);
    // await data.save({validateBeforeSave : false});
    res.status(200).json({success : true, message : "data created" });
    // console.log(data)
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
  let {error,value}= Joi.object({
    id : Joi.string().required(),
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // console.log(req.file);
    // const filename = req.file.filename;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;
    console.log(req.body.id)
    const obj = await LLP_About.findById(req.body.id)
    if(!obj) return res.status(400).json({ success: false, message: "data  not exits" });
    
      // var filename = req.file.path;
      // var basepath = `https://4pillarsinfotechindia.com/api/`;
      const basepath = process.env.BASE_PATH;
      //   var filename = req.file.filename;
      //   var basepath = `${req.protocol}://${req.get("host")}/uploads/`;
      // console.log(req.files)
      var record = {
        title: req.body.title?req.body.title:obj.title,
        content: req.body.content?req.body.content:obj.content,
        description: req.body.description?req.body.description:obj.description,
        authorName: req.body.authorName?req.body.authorName:obj.authorName,
        createdAt: req.body.createdAt?req.body.createdAt:obj.createdAt,
        description2 : req.body.description2?req.body.description2:obj.description2,
        image: req.files && Array.isArray(req.files.bgImage)?`${basepath}/uploads/${req.files.bgImage[0].filename}`:obj.image==undefined?"":obj.image,
        // image : req.body.bImage,
        authorPicture : req.files && Array.isArray(req.files.autImage)?`${basepath}/uploads/${req.files.autImage[0].filename}`:obj.image==undefined?"":obj.authorPicture,
        readingTime : req.body.readingTime?req.body.readingTime:obj.readingTime,
        hide : req.body.hide?req.body.hide:obj.hide
      };
    // console.log(req.params.id)
    // console.log(req.body);
    // const data = await Four_PII_About.findById(req.body.id);
    // if (!data) {
    //   res.status(400).json({ success: false, message: "data  not exits" });
    // }

    try {
      const mydata = await LLP_About.findByIdAndUpdate(req.body.id, record, {
        new: true,
        runValidators: true,
      });
  
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }
    return res.status(200).json({
      success: true,
      // updateddata: mydata,
      message: "Successfully updated",
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
    try {
      const newdata = await LLP_About.findByIdAndDelete(req.body.id);
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }
    res.status(200).json({ success: true, message: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

// for 99ideas LLC About Data

module.exports.Add_llc = async (req, res) => {
  let {error,value}= Joi.object({
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // console.log(req.file);
    // const filename = req.file.filename;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;
    // const obj = await LLC_About.findById(req.body.id)
    // if(!obj) return res.status(400).json({ success: false, message: "data  not exits" });
    
      // var filename = req.file.path;
      // var basepath = `https://4pillarsinfotechindia.com/api/`;
      const basepath = process.env.BASE_PATH;
      //   var filename = req.file.filename;
      //   var basepath = `${req.protocol}://${req.get("host")}/uploads/`;
      // console.log(req.files)
      try {
        const record = await LLC_About.create({
          title: req.body.title?req.body.title:"",
          content: req.body.content?req.body.content:"",
          description: req.body.description?req.body.description:"",
          authorName: req.body.authorName?req.body.authorName:"",
          createdAt: req.body.createdAt?req.body.createdAt:"",
          description2 : req.body.description2?req.body.description2:"",
          image: req.files && Array.isArray(req.files.bgImage)?`${basepath}/uploads/${req.files.bgImage[0].filename}`:"",
          // image : req.body.bImage,
          authorPicture : req.files && Array.isArray(req.files.autImage)?`${basepath}/uploads/${req.files.autImage[0].filename}`:"",
          readingTime : req.body.readingTime?req.body.readingTime:"",
          hide : req.body.hide?req.body.hide:"",
        });
      } catch (error) {
        console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
      }
    // console.log(req.params.id)
    // console.log(req.body);
    // const data = await Four_PII_About.findById(req.body.id);
    // if (!data) {
    //   res.status(400).json({ success: false, message: "data  not exits" });
    // }

    // const mydata = await LLC_About.create(record);

    return res.status(200).json({
      success: true,
      // updateddata: record,
      message: "Successfully created",
    });
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

module.exports.update_llc = asyncMiddleware(async (req, res) => {
  let {error,value}= Joi.object({
    id : Joi.string().required(),
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
      // var filename = req.file.path;
    const obj = await LLC_About.findById(req.body.id)
      const basepath = process.env.LLC_BASEPATH;
      var record = {
        title: req.body.title?req.body.title:obj.title,
        content: req.body.content?req.body.content:obj.content,
        description: req.body.description?req.body.description:obj.description,
        authorName: req.body.authorName?req.body.authorName:obj.authorName,
        createdAt: req.body.createdAt?req.body.createdAt:obj.createdAt,
        description2 : req.body.description2?req.body.description2:obj.description2,
        image: req.files && Array.isArray(req.files.bgImage)?`${basepath}/uploads/${req.files.bgImage[0].filename}`:obj.image==undefined?"":obj.image,
        // image : req.body.bImage,
        authorPicture : req.files && Array.isArray(req.files.autImage)?`${basepath}/uploads/${req.files.autImage[0].filename}`:obj.image==undefined?"":obj.authorPicture,
        readingTime : req.body.readingTime?req.body.readingTime:obj.readingTime,
        hide : req.body.hide?req.body.hide:obj.hide
      };
    // else {
    //   var record = {
    //     title: req.body.info,
    //     content: req.body.info_head,
    //     description : req.body.description,
    //     authorName : req.body.authorName,
    //     description2 : req.body.description2,
    //   };
    // }
    // console.log(req.params.id)
    console.log(req.body);
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, message: "data  not exits" });
    }

    try {
      const mydata = await LLC_About.findByIdAndUpdate(req.body.id, record, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }

    return res.status(200).json({
      success: true,
      // updateddata: mydata,
      message: "Successfully updated",
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
    try {
      const newdata = await LLC_About.findByIdAndDelete(data.id);
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }
    res.status(200).json({ success: true, message: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});

//-----------------SAAS DATA------------------------------

module.exports.Add_saas = async (req, res) => {
  let {error,value}= Joi.object({
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number(),
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // const filename = req.file.path;
    // const filename = req.file.filename;
    // const basepath = process.env.BASE_PATH;
    // const basepath = `${req.protocol}://${req.get("host")}/uploads/`;
    // console.log(req.body)
    const basepath = process.env.BASE_PATH;
    try {
      const data = await saas_About.create({
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        authorName: req.body.authorName,
        createdAt: req.body.createdAt,
        description2 : req.body.description2,
        readingTime : req.body.readingTime,
        image : req.files && Array.isArray(req.files.bgImage) &&req.files?.bgImage[0]?.filename? `${basepath}/uploads/${req.files?.bgImage[0]?.filename}`: "",
        authorPicture : req.files && Array.isArray(req.files.authImage) && req.files?.authImage[0]?.filename? `${basepath}/uploads/${req.files?.authImage[0]?.filename}` : "",
        hide : req.body.hide?req.body.hide:0
      });
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }

    // if (req.files) {
    //   data.image = req.files.bgImage? `${basepath}/uploads/${req.files?.bgImage[0]?.path}` : "";
    //   data.authorPicture = req.files.autImage? `${basepath}/uploads/${req.files?.autImage[0]?.path}` : ""
    // }
    // console.log(req.file);
    // await data.save({validateBeforeSave : false});
    res.status(200).json({success : true, message : "data created" });
    // console.log(data)
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
  let {error,value}= Joi.object({
    id : Joi.string().required(),
    title : Joi.string(),
    content : Joi.string(),
    description : Joi.string()
    .min(50)
    .error(new Error("need 50 characters in description")),
    authorName : Joi.string(),
    createdAt : Joi.string(),
    description2 : Joi.string(),
    readingTime : Joi.string(),
    bgImage : Joi.any(),
    authImage : Joi.any(),
    hide : Joi.number()
  }).validate(req.body)
  if(error){
    console.log(error)
    return res.status(400).json({success : false,message : error.message})
  }
  try {
    // console.log(req.file);
    // const filename = req.file.filename;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;
    const obj = await saas_About.findById(req.body.id)
    if(!obj) return res.status(400).json({ success: false, message: "data  not exits" });
    
      // var filename = req.file.path;
      // var basepath = `https://4pillarsinfotechindia.com/api/`;
      const basepath = process.env.BASE_PATH;
      //   var filename = req.file.filename;
      //   var basepath = `${req.protocol}://${req.get("host")}/uploads/`;
      // console.log(req.files)
      var record = {
        title: req.body.title?req.body.title:obj.title,
        content: req.body.content?req.body.content:obj.content,
        description: req.body.description?req.body.description:obj.description,
        authorName: req.body.authorName?req.body.authorName:obj.authorName,
        createdAt: req.body.createdAt?req.body.createdAt:obj.createdAt,
        description2 : req.body.description2?req.body.description2:obj.description2,
        image: req.files && Array.isArray(req.files.bgImage)?`${basepath}/uploads/${req.files.bgImage[0].filename}`:obj.image==undefined?"":obj.image,
        // image : req.body.bImage,
        authorPicture : req.files && Array.isArray(req.files.autImage)?`${basepath}/uploads/${req.files.autImage[0].filename}`:obj.image==undefined?"":obj.authorPicture,
        readingTime : req.body.readingTime?req.body.readingTime:obj.readingTime,
        hide : req.body.hide?req.body.hide:obj.hide
      };
    // console.log(req.params.id)
    // console.log(req.body);
    // const data = await Four_PII_About.findById(req.body.id);
    // if (!data) {
    //   res.status(400).json({ success: false, message: "data  not exits" });
    // }

    try {
      const mydata = await saas_About.findByIdAndUpdate(req.body.id, record, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }

    return res.status(200).json({
      success: true,
      // updateddata: mydata,
      message: "Successfully updated",
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
    try {
      const newdata = await saas_About.findByIdAndDelete(req.body.id);
    } catch (error) {
      console.log(error)
      if(error.codeName=='AtlasError')return res.status(403).json({success : false,message : "database is Read only Mode"})
      return res.status(500).json({success : false,message : error})
    }
    res.status(200).json({ success: true, message: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});
