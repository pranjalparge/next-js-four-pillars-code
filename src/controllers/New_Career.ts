const express = require("express");
const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const Four_PII_About = require("../models/4pii_New_Career");
const krislin_About = require("../models/krislin_about");
const LLC_About = require("../models/LLC_Career_Page");
const saas_About = require("../models/99ideasSaas/saas_CareerPage");
const LLP_About = require("../models/99ideasLLP_about");
const User = require("../models/User");

// for 4PIII About Data

module.exports.Add_4pii = async (req, res) => {
  try {
    console.log("sima", req.body);
    const filename = req.file.path;
    const basepath = process.env.BASE_PATH;
    // const filename = req.file.filename;
    // const basepath = `${req.protocol}://${req.get('host')}/uploads/`;

    const data = await Four_PII_About.create({
      title: req.body.title,
      Company_name: req.body.Company_name,
      location: req.body.location,
      Experiance: req.body.Experiance,
      salary: req.body.salary,
      skills: req.body.skills,
      description: req.body.description,
      postedDate: req.body.postedDate,
      expireDate: req.body.expireDate,
    });
    // console.log("sss" , data)

    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    console.log(req.file);

    await data.save();
    res.json({ message: "about _4pii_data", data });
    // console.log(data)
  } catch (error) {
    res.send(error);
    // console.log(error)
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

// module.exports.update_4pii = asyncMiddleware( async(req,res)=>{
//     try{
//         // console.log(req.params.id)
//         console.log(req.body)
//         const data = await Four_PII_About.findById(req.body.id)
//         if (!data) {
//             res.status(400).json({ success: false, msg: 'data  not exits' });
//         }

//         const mydata = await Four_PII_About.findByIdAndUpdate(req.body.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         res.status(200).json({ success: true, updateddata: mydata, msg: 'Successfully updated' });

//     }catch(error){
//         console.log(error)
//         res.status(400).json(`Error: ${error}`)

//     }

// })

module.exports.update_4pii = asyncMiddleware(async (req, res) => {
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
        title: req.body.title,
        Company_name: req.body.Company_name,
        location: req.body.location,
        Experiance: req.body.Experiance,
        salary: req.body.salary,
        skills: req.body.skills,
        description: req.body.description,
        postedDate: req.body.postedDate,
        expireDate: req.body.expireDate,
        image: `${basepath}${filename}`,
      };
    } else {
      var record = {
        title: req.body.title,
        Company_name: req.body.Company_name,
        location: req.body.location,
        Experiance: req.body.Experiance,
        salary: req.body.salary,
        skills: req.body.skills,
        description: req.body.description,
        postedDate: req.body.postedDate,
        expireDate: req.body.expireDate,
      };
    }
    // console.log(req.params.id)
    console.log(req.body);
    const data = await Four_PII_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }

    const mydata = await Four_PII_About.findByIdAndUpdate(req.body.id, record, {
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
// serch api for career
module.exports.search_4pii = asyncMiddleware(async (req, res) => {
  try {
    console.log(req.params.key);
    id = req.params.id;
    var search = req.body.search;

    const data = await Four_PII_About.find({
      $or: [
        { title: { $regex: search } },
        { location: { $regex: search } },
        { Experiance: { $regex: search } },
      ],
    });
    if (data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(200).send("data not found");
    }
  } catch (error) {
    res.status(400).send({ success: false, error });
    console.log.error;
  }
});

// For Krislin About Data

module.exports.Add_krislin = async (req, res) => {
  try {
    const data = await krislin_About.create({
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
    const basepath = process.env.LLC_BASEPATH;
    const filename = req.file.path;

    const data = await LLC_About.create({
      title: req.body.title,
      Company_name: req.body.Company_name,
      location: req.body.location,
      Experiance: req.body.Experiance,
      salary: req.body.salary,
      skills: req.body.skills,
      description: req.body.description,
      postedDate: req.body.postedDate,
      expireDate: req.body.expireDate,
    });

    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    await data.save();
    res.json({ message: "about _LLC_data", data });
  } catch (error) {
    res.send(error);
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
    console.log(req.body.id);
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

//-----------------------SAAS DATA---------------------------------

module.exports.Add_saas = async (req, res) => {
  try {
    const basepath = process.env.BASE_PATH;
    // const filename = req.file.filename;
    const {...body} = req.body

    const data = await saas_About.create(body);
    if (req.file) {
      data.image = `${basepath}/uploads/${req.file.filename}`;
    }
    await data.save();
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
    const {id,...body} = req.body
    const mydata = await saas_About.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (req.file) {
      mydata.image = `${basepath}/uploads/${req.file.filename}`;
    }
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
    const data = await saas_About.findByIdAndDelete(req.body.id);
    if (!data) {
      res.status(400).send("no data found");
    }
    // const newdata = await saas_About.findOneAndDelete(req.body.id);
    res.status(200).json({ success: true, msg: "Successfully Deleted task." });
  } catch (error) {
    console.log(error);
  }
});
