const express = require("express");
const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const Four_PII_About = require("../models/4pii_about");
const krislin_About = require("../models/krislin_about");
const LLC_About = require("../models/LLC_About");
const LLP_About = require("../models/LLP_About");
const saas_About = require("../models/99ideasSaas/saas_about");
const User = require("../models/User");
const Joi = require('joi');

// for 4PIII About Data

const basepath = process.env.BASE_PATH;

exports.Add_fpii = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data); // JSON string from frontend
    const basePath = process.env.BASE_PATH; 

    // ✅ Inline Joi schema
    const { error, value } = Joi.object({
      advObject1: Joi.string().allow('', null),
      advObject2: Joi.string().allow('', null),
      advObject3: Joi.string().allow('', null),
      title: Joi.string().required(),
      content: Joi.string().required(),
      list:Joi.array(),

      featuresSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        features: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional()
          })
        ).required()
      }).required(),

      coreFeaturesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        coreFeatures: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional()
          })
        ).required()
      }).required(),

      useCasesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        useCases: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            image: Joi.string().optional(),
            description: Joi.string().required()
          })
        ).required()
      }).required(),
       corevalueSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        useCases: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            image: Joi.string().optional(),
            description: Joi.string().required()
          })
        ).required()
      }).required()
    }).validate(data, { abortEarly: false });

    // ❌ Validation failed
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => d.message)
      });
    }

    // ✅ Attach file paths to validated value
    const files = req.files;

    value.featuresSection.features.forEach((item, i) => {
      const file = files.featureImages?.[i];
      item.image = file ? `${basepath}/uploads/${file.filename}` : '';
    });

    value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
      const file = files.coreFeatureImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    value.useCasesSection.useCases.forEach((item, i) => {
      const file = files.useCaseImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    //  value.corevalueSection.useCases.forEach((item, i) => {
    //   const file = files.useCaseImages?.[i];
    //   item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    // });

    value.corevalueSection.useCases.forEach((item, i) => {
  const file = files.corevalueImages?.[i];  // ✅ use correct input field
  item.image = file ? `${basePath}/uploads/${file.filename}` : '';
});


    // ✅ Save validated and processed data
    const integration = new Four_PII_About(value);
    await integration.save();

    res.status(201).json({ message: 'Created successfully', data: integration });

  } catch (err) {
    console.log(err , "error");
    
    res.status(500).json({ error: err.message });
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



exports.Update_fpii = async (req, res) => {
  try {
    // ✅ Get the ID from URL query parameters (e.g., /api/fpii?id=123)
    const { id } = req.query; 
    
    const data = JSON.parse(req.body.data); // JSON string from frontend
    const basePath = process.env.BASE_PATH;

    // ✅ Inline Joi schema for update (largely same as create, required fields remain required for full update)
    const { error, value } = Joi.object({
      advObject1: Joi.string().allow('', null),
      advObject2: Joi.string().allow('', null),
      advObject3: Joi.string().allow('', null),
      title: Joi.string().required(),
      content: Joi.string().required(),
      list: Joi.array().items(Joi.string()), // Assuming list is an array of strings, adjust if needed

      featuresSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        features: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional().allow('', null) // Image can be optional for update
          })
        ).required()
      }).required(),

      coreFeaturesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        coreFeatures: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional().allow('', null)
          })
        ).required()
      }).required(),

      useCasesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        useCases: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            image: Joi.string().optional().allow('', null),
            description: Joi.string().required()
          })
        ).required()
      }).required(),

      corevalueSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        useCases: Joi.array().items( // Reusing 'useCases' key as per your schema, but it represents core values
          Joi.object({
            title: Joi.string().required(),
            image: Joi.string().optional().allow('', null),
            description: Joi.string().required()
          })
        ).required()
      }).required()
    }).validate(data, { abortEarly: false });

    // ❌ Validation failed
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => d.message)
      });
    }

    // ✅ Fetch the existing document to merge image paths if not provided in the update
    const existingDocument = await Four_PII_About.findById(id);

    if (!existingDocument) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // ✅ Attach file paths to validated value, prioritizing new uploads
    const files = req.files;

    // Features Section Images
    value.featuresSection.features.forEach((item, i) => {
      const file = files.featureImages?.[i];
      if (file) {
        item.image = `${basePath}/uploads/${file.filename}`;
      } else if (existingDocument.featuresSection.features[i] && existingDocument.featuresSection.features[i].image) {
        // Keep existing image path if no new file is uploaded for this item
        item.image = existingDocument.featuresSection.features[i].image;
      } else {
        item.image = ''; // Set to empty if no new file and no existing image
      }
    });

    // Core Features Section Images
    value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
      const file = files.coreFeatureImages?.[i];
      if (file) {
        item.image = `${basePath}/uploads/${file.filename}`;
      } else if (existingDocument.coreFeaturesSection.coreFeatures[i] && existingDocument.coreFeaturesSection.coreFeatures[i].image) {
        item.image = existingDocument.coreFeaturesSection.coreFeatures[i].image;
      } else {
        item.image = '';
      }
    });

    // Use Cases Section Images
    value.useCasesSection.useCases.forEach((item, i) => {
      const file = files.useCaseImages?.[i];
      if (file) {
        item.image = `${basePath}/uploads/${file.filename}`;
      } else if (existingDocument.useCasesSection.useCases[i] && existingDocument.useCasesSection.useCases[i].image) {
        item.image = existingDocument.useCasesSection.useCases[i].image;
      } else {
        item.image = '';
      }
    });

    // Core Value Section Images
    value.corevalueSection.useCases.forEach((item, i) => {
      const file = files.corevalueImages?.[i];
      if (file) {
        item.image = `${basePath}/uploads/${file.filename}`;
      } else if (existingDocument.corevalueSection.useCases[i] && existingDocument.corevalueSection.useCases[i].image) {
        item.image = existingDocument.corevalueSection.useCases[i].image;
      } else {
        item.image = '';
      }
    });

    // ✅ Update the document in the database
    const updatedIntegration = await Four_PII_About.findByIdAndUpdate(
      id,
      value,
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` runs schema validators on update
    );

    if (!updatedIntegration) {
      return res.status(404).json({ message: 'Record not found for update' });
    }

    res.status(200).json({ message: 'Updated successfully', data: updatedIntegration });

  } catch (err) {
    console.error(err, "error"); // Use console.error for errors
    res.status(500).json({ error: err.message });
  }
};

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

// module.exports.Add_krislin = async (req, res) => {
//   try {
//     const data = await krislin_About.create({
//       info: req.body.info,
//       info_head: req.body.info_head,
//     });
//     if (req.file) {
//       data.image = req.file.path;
//     }
//     console.log(req.file);

//     await data.save();
//     res.json({ message: "about _krislin_data", data });
//     console.log(data);
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// };

// module.exports.get_krislin_Data = asyncMiddleware(async (req, res) => {
//   const lang = req.query.lang;
//   try {
//     let getData = await krislin_About.find();
//     return res.status(200).send(getData);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send("Internal server error");
//   }
// });

// module.exports.update_krislin = asyncMiddleware(async (req, res) => {
//   try {
//     console.log(req.params.id);
//     console.log(req.body.id);
//     const data = await krislin_About.findById(req.body.id);
//     if (!data) {
//       res.status(400).json({ success: false, msg: "data  not exits" });
//     }
//     const mydata = await krislin_About.findByIdAndUpdate(
//       req.body.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     res.status(200).json({
//       success: true,
//       updateddata: mydata,
//       msg: "Successfully updated",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(`Error: ${error}`);
//   }
// });

// module.exports.delete_krislin = asyncMiddleware(async (req, res) => {
//   try {
//     console.log(req.body.id);
//     const data = await krislin_About.findById(req.body.id);
//     if (!data) {
//       res.status(400).send("no data found");
//     }
//     const newdata = await krislin_About.findByIdAndDelete(req.body.id);
//     res.status(200).json({ success: true, msg: "Successfully Deleted task." });
//   } catch (error) {
//     console.log(error);
//   }
// });

// for 99Ideas_LLP About Data

module.exports.Add_llp = async (req, res) => {
  try {
    // const filename = req.file.filename;
    const basepath = process.env.LLP_BASEPATH ;
    const filename = req.file.path;
    const data = await LLP_About.create({
      info: req.body.info,
      info_head: req.body.info_head,
    });
    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    console.log(req.file);

    await data.save();
    res.json({ message: "about llp_data", data });

    // await data.save()
    // res.json({message:"about _4pii_data" ,data})
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
  try {
    if (req.file) {
      var filename = req.file.path;
      const basepath = process.env.LLP_BASEPATH;
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
        image: `${basepath}${filename}`,
      };
    } else {
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
      };
    }
    const data = await LLP_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await LLP_About.findByIdAndUpdate(req.body.id, record, {
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
      info: req.body.info,
      info_head: req.body.info_head,
    });
    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    await data.save();
    res.json({ message: "about llc_data", data });
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
  try {
    if (req.file) {
      var filename = req.file.path;
      const basepath = process.env.LLC_BASEPATH;
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
        image: `${basepath}${filename}`,
      };
    } else {
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
      };
    }
    const data = await LLC_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await LLC_About.findByIdAndUpdate(req.body.id, record, {
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

//--------------SAAS DATA-----------------------
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
    res.json({ message: "about saas_data", data });
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
    if (req.file) {
      var filename = req.file.path;
      const basepath = process.env.saas_BASEPATH;
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
        image: `${basepath}${filename}`,
      };
    } else {
      var record = {
        info: req.body.info,
        info_head: req.body.info_head,
      };
    }
    const data = await saas_About.findById(req.body.id);
    if (!data) {
      res.status(400).json({ success: false, msg: "data  not exits" });
    }
    const mydata = await saas_About.findByIdAndUpdate(req.body.id, record, {
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



// // Add About Page Data
// exports.Add_krislin = async (req, res) => {
//   try {
//     const {
//       aboutHead,
//       aboutContent,
//       vissionHead,
//       vissionContent,
//       missionHead,
//       misssionContent, // Note: If this is a typo, fix it in your model too
//       whychoosHead,
//       whychooseContent
//     } = req.body;

//     // Parse services from body
//     const services = (req.body.services || []).map((_, index) => ({
//       title: req.body.services[index].title,
//       content: req.body.services[index].content,
//       image: req.files.servicesImages?.[index]?.path || null
//     }));

//     // Parse whyChooseUs from body
//     const whyChooseUs = (req.body.whyChooseUs || []).map((_, index) => ({
//       heading: req.body.whyChooseUs[index].heading,
//       content: req.body.whyChooseUs[index].content,
//       image: req.files.whyChooseImages?.[index]?.path || null
//     }));

//     const newAboutPage = new krislin_About({
//       aboutHead,
//       aboutContent,
//       vissionHead,
//       vissionContent,
//       missionHead,
//       misssionContent,
//       whychoosHead,
//       whychooseContent,
//       services,
//       whyChooseUs,
//       visionSection: {
//         heading: req.body.visionSection?.heading || "",
//         content: req.body.visionSection?.content || "",
//         image: req.files.visionImage?.[0]?.path || null
//       },
//       missionSection: {
//         heading: req.body.missionSection?.heading || "",
//         content: req.body.missionSection?.content || "",
//         image: req.files.missionImage?.[0]?.path || null
//       }
//     });

//     const savedPage = await newAboutPage.save();
//     res.status(201).json(savedPage);
//   } catch (err) {
//     console.error("Save Error:", err);
//     res.status(500).json({ message: "Error creating about page", error: err });
//   }
// };

// exports.Add_krislin = async (req, res) => {
//   try {
//     const {
//       aboutHead,
//       aboutContent,
//       vissionHead,
//       vissionContent,
//       missionHead,
//       misssionContent, // Be sure this typo matches your schema
//       whychoosHead,
//       whychooseContent
//     } = req.body;

//     // Extract services manually
//     const services = [];
//     let index = 0;
//     while (req.body[`services[${index}].title`]) {
//       services.push({
//         title: req.body[`services[${index}].title`],
//         content: req.body[`services[${index}].content`] || "",
//         image: req.files?.[`services[${index}].image`]?.[0]?.path || null
//       });
//       index++;
//     }

//     // Extract whyChooseUs manually
//     const whyChooseUs = [];
//     index = 0;
//     while (req.body[`whyChooseUs[${index}].heading`]) {
//       whyChooseUs.push({
//         heading: req.body[`whyChooseUs[${index}].heading`] || "",
//         content: req.body[`whyChooseUs[${index}].content`] || "",
//         image: req.files?.[`whyChooseUs[${index}].image`]?.[0]?.path || null
//       });
//       index++;
//     }

//     // Build new document
//     const newAboutPage = new krislin_About({
//       aboutHead,
//       aboutContent,
//       vissionHead,
//       vissionContent,
//       missionHead,
//       misssionContent,
//       whychoosHead,
//       whychooseContent,
//       services,
//       whyChooseUs,
//       visionSection: {
//         heading: req.body.visionSection?.heading || "",
//         content: req.body.visionSection?.content || "",
//         image: req.files?.visionImage?.[0]?.path || null
//       },
//       missionSection: {
//         heading: req.body.missionSection?.heading || "",
//         content: req.body.missionSection?.content || "",
//         image: req.files?.missionImage?.[0]?.path || null
//       }
//     });
//     console.log(req.files , "sss");  // Logs uploaded files
// console.log(req.body,"kkk"); 

//     const savedPage = await newAboutPage.save();
//     res.status(201).json(savedPage);
//   } catch (err) {
//     console.error("Save Error:", err);
//     res.status(500).json({ message: "Error creating about page", error: err });
//   }
// };


// exports.Add_krislin = async (req, res) => {
//   try {
//     const {
//       aboutHead,
//       aboutContent,
//       vissionHead,
//       vissionContent,
//       missionHead,
//       misssionContent, // Check the typo here
//       whychoosHead,
//       whychooseContent
//     } = req.body;

//     // Extract services manually
//     const services = [];
//     let index = 0;
//     while (req.body[`services[${index}].title`]) {
//       services.push({
//         title: req.body[`services[${index}].title`],
//         content: req.body[`services[${index}].content`] || "",
//         image: req.files?.find(file => file.fieldname === `services[${index}].image`)?.path.replace(/\\/g, '/') || null
//       });
//       index++;
//     }

//     // Extract whyChooseUs manually
//     const whyChooseUs = [];
//     index = 0;
//     while (req.body[`whyChooseUs[${index}].heading`]) {
//       whyChooseUs.push({
//         heading: req.body[`whyChooseUs[${index}].heading`] || "",
//         content: req.body[`whyChooseUs[${index}].content`] || "",
//         image: req.files?.find(file => file.fieldname === `whyChooseUs[${index}].image`)?.path.replace(/\\/g, '/') || null
//       });
//       index++;
//     }

//     // Build new document
//     const newAboutPage = new krislin_About({
//       aboutHead,
//       aboutContent,
//       vissionHead,
//       vissionContent,
//       missionHead,
//       misssionContent,
//       whychoosHead,
//       whychooseContent,
//       services,
//       whyChooseUs,
//       visionSection: {
//         heading: req.body.visionSection?.heading || "",
//         content: req.body.visionSection?.content || "",
//         image: req.files?.find(file => file.fieldname === 'visionSection.image')?.path.replace(/\\/g, '/') || null
//       },
//       missionSection: {
//         heading: req.body.missionSection?.heading || "",
//         content: req.body.missionSection?.content || "",
//         image: req.files?.find(file => file.fieldname === 'missionSection.image')?.path.replace(/\\/g, '/') || null
//       }
//     });

//     const savedPage = await newAboutPage.save();
//     res.status(201).json(savedPage);
//   } catch (err) {
//     console.error("Save Error:", err);
//     res.status(500).json({ message: "Error creating about page", error: err });
//   }
// };



exports.Add_krislin = async (req, res) => {
  try {
    const {
      aboutHead,
      aboutContent,
      vissionHead,
      vissionContent,
      missionHead,
      misssionContent,
      whychoosHead,
      whychooseContent
    } = req.body;

    // Extract services manually
    const services = [];
    let index = 0;
    while (req.body[`services[${index}].title`]) {
      const imageFile = req.files?.find(file => file.fieldname === `services[${index}].image`);
      services.push({
        title: req.body[`services[${index}].title`],
        content: req.body[`services[${index}].content`] || "",
        image: imageFile ? `${basepath}/uploads/${imageFile.filename.replace(/\\/g, '/')}` : null
      });
      index++;
    }

    // Extract whyChooseUs manually
    const whyChooseUs = [];
    index = 0;
    while (req.body[`whyChooseUs[${index}].heading`]) {
      const imageFile = req.files?.find(file => file.fieldname === `whyChooseUs[${index}].image`);
      whyChooseUs.push({
        heading: req.body[`whyChooseUs[${index}].heading`] || "",
        content: req.body[`whyChooseUs[${index}].content`] || "",
        image: imageFile ? `${basepath}/uploads/${imageFile.filename.replace(/\\/g, '/')}` : null
      });
      index++;
    }

    // Build new document
    const newAboutPage = new krislin_About({
      aboutHead,
      aboutContent,
      vissionHead,
      vissionContent,
      missionHead,
      misssionContent,
      whychoosHead,
      whychooseContent,
      services,
      whyChooseUs,
      visionSection: {
        heading: req.body.visionSection?.heading || "",
        content: req.body.visionSection?.content || "",
        image: req.files?.find(file => file.fieldname === 'visionSection.image') ? 
               `${basepath}/uploads/${req.files.find(file => file.fieldname === 'visionSection.image').filename.replace(/\\/g, '/')}` : null
      },
      missionSection: {
        heading: req.body.missionSection?.heading || "",
        content: req.body.missionSection?.content || "",
        image: req.files?.find(file => file.fieldname === 'missionSection.image') ? 
               `${basepath}/uploads/${req.files.find(file => file.fieldname === 'missionSection.image').filename.replace(/\\/g, '/')}` : null
      }
    });

    const savedPage = await newAboutPage.save();
    res.status(200).json(savedPage);
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ message: "Error creating about page", error: err });
  }
};





// Get About Page Data
exports.get_krislin_Data = async (req, res) => {
  try {
    const aboutPage = await krislin_About.find();
    res.status(200).json(aboutPage);
  } catch (err) {
    res.status(500).json({ message: "Error fetching about page data", error: err });
  }
};

// Update About Page Data
exports.update_krislin = async (req, res) => {
  try {
      let data = await krislin_About.find()
      let vissionSection  = data[0].visionSection
      let missionSection = data[0].missionSection
      if(Array.isArray(req.files.vissionSectionImage) && req.files.vissionSectionImage[0]){
        vissionSection.image = `${basepath}/uploads/${req.files.vissionSectionImage[0].filename}`
      }
      if(Array.isArray(req.files.missionSectionImage) && req.files.missionSectionImage[0]){
        missionSection.image = `${basepath}/uploads/${req.files.missionSectionImage[0].filename}`
      }
      let whyChooseUs = req.body.whyChooseUs?req.body.whyChooseUs:data[0].whyChooseUs
      let services = req.body.services?req.body.services:data[0].services
      if(Array.isArray(req.files.whychooseUsImage) && req.files.whychooseUsImage[0]){
        if(req.body.whychooseUsId){
          let event = whyChooseUs.find(e=>e._id==req.body.whychooseUsId)
          event.image = `${basepath}/uploads/${req.files.whychooseUsImage[0].filename}`
          whyChooseUs = whyChooseUs.map(e=>e._id==req.whychooseUsId?event:e)
        }
      }
      if(Array.isArray(req.files.serviceImage) && req.files.serviceImage[0]){
        if(req.body.serviceId){
          let event = services.find(e=>e._id==req.body.serviceId)
          event.image = `${basepath}/uploads/${req.files.serviceImage[0].filename}`
          services = services.map(e=>e._id==req.body.serviceId?event:e)
        }
      }
      // if(serviceID)
    const updatedPage = await krislin_About.findByIdAndUpdate(
      req.body.id, // Assuming you send the ID of the page to update
      {
        aboutHead: req.body.aboutHead?req.body.aboutHead:data[0].aboutHead,
        aboutContent: req.body.aboutContent?req.body.aboutContent:data[0].aboutContent,
        vissionHead: req.body.vissionHead?req.body.vissionHead:data[0].vissionHead,
        vissionContent: req.body.vissionContent?req.body.vissionContent:data[0].vissionContent,
        missionHead: req.body.missionHead?req.body.missionHead:data[0].missionHead,
        misssionContent: req.body.misssionContent?req.body.misssionContent:data[0].misssionContent,
        whychoosHead: req.body.whychoosHead?req.body.whychoosHead:data[0].whychoosHead,
        whychooseContent: req.body.whychooseContent?req.body.whychooseContent:data[0].whychooseContent,
        services: services,
        whyChooseUs: whyChooseUs,
        visionSection: {
          heading: req.body.visionSection?req.body.visionSection.heading:vissionSection.heading,
          content: req.body.visionSection?req.body.visionSection.heading:vissionSection.content,
          image: Array.isArray(req.files.vissionSectionImage) && req.files.vissionSectionImage[0]?vissionSection.image:data[0].visionSection.image
        },
        missionSection: {
          heading: req.body.missionSection?req.body.missionSection.heading:missionSection.heading,
          content: req.body.missionSection?req.body.missionSection.content:missionSection.content,
          image:Array.isArray(req.files.missionSectionImage) && req.files.missionSectionImage[0]? missionSection.image:data[0].missionSection.image
        }
      },
      { new: true }
    );

    res.status(200).json(updatedPage);
  } catch (err) {
    res.status(500).json({ message: "Error updating about page", error: err });
    console.log(err)
  }
};

// Delete About Page Data
exports.delete_krislin = async (req, res) => {
  try {
    const deletedPage = await KrislinAboutPage.findByIdAndDelete(req.body._id);
    res.status(200).json({ message: "About page deleted", deletedPage });
  } catch (err) {
    res.status(500).json({ message: "Error deleting about page", error: err });
  }
};
