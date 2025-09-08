const express = require("express");
const asyncMiddleware = require("../middleware/async");
require("dotenv").config();

const Four_PII_About = require("../models/4pii_New_Clientle");
const krislin_About = require("../models/krislin_Cliientle");
const LLC_About = require("../models/LLc_Clientele");
const saas_About = require("../models/99ideasSaas/saas_Clientle");
const LLP_About = require("../models/LLP_clientle");
const Joi = require("joi");

const basePath = process.env.BASE_PATH; 

// for 4PIII About Data



exports.Add_4pii = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data); // JSON string from frontend

    // ✅ Inline Joi schema
    const { error, value } = Joi.object({
      advObject1: Joi.string().allow('', null),
      advObject2: Joi.string().allow('', null),
      advObject3: Joi.string().allow('', null),
      title: Joi.string().required(),
      content: Joi.string().required(),

      featuresSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        head:Joi.string(),
        content:Joi.string(),
        secionsubContent:Joi.string(),
        features: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional(),
              head:Joi.string(),
          })
        ).required()
      }).required(),

      coreFeaturesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        head:Joi.string(),
        content:Joi.string(),
        secionsubContent:Joi.string(),
        coreFeatures: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional(),
            head:Joi.string(),
          })
        ).required()
      }).required(),

      useCasesSection: Joi.object({
        sectionTitle: Joi.string().required(),
        sectionContent: Joi.string().required(),
        head:Joi.string(),
        content:Joi.string(),
        secionsubContent:Joi.string(),
        useCases: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            image: Joi.string().optional(),
            description: Joi.string().required(),
            head:Joi.string(),
          })
        ).required()
      }).required(),
       fourtSection:Joi.object({
         head:Joi.string(),
        content:Joi.string(),
         fourthCases:Joi.object({
           title: Joi.string().required(),
            image: Joi.string().optional(),
            description: Joi.string().required(),
            head:Joi.string(),
         })
       }),
        fipthSection:Joi.object({
         head:Joi.string(),
        content:Joi.string(),
        fipthCases:Joi.object({
           title: Joi.string().required(),
            image: Joi.string().optional(),
            description: Joi.string().required(),
            head:Joi.string(),
         })
       }),
        sixSection:Joi.object({
         head:Joi.string(),
        content:Joi.string(),
         sixCases:Joi.object({
           title: Joi.string().required(),
            image: Joi.string().optional(),
            description: Joi.string().required(),
            head:Joi.string(),
         })
       }),
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
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
      const file = files.coreFeatureImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    value.useCasesSection.useCases.forEach((item, i) => {
      const file = files.useCaseImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    
    value.fourthsection.fourthCases.forEach((item, i) => {
      const file = files.fouthCaseImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });
    
    value.fipthsection.fipthCases.forEach((item, i) => {
      const file = files.fipthCaseImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });
    
    value.sixsection.sixCases.forEach((item, i) => {
      const file = files.sixCaseImages?.[i];
      item.image = file ? `${basePath}/uploads/${file.filename}` : '';
    });

    const useCasesSectionImage = files.useCasesSectionImage?.[0];
    value.useCasesSection.image = useCasesSectionImage
  ? `${basePath}/uploads/${useCasesSectionImage.filename}`
  : '';

    // ✅ Save validated and processed data
    const integration = new Four_PII_About(value);
    await integration.save();

    res.status(201).json({ message: 'Created successfully', data: integration });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// module.exports.Add_4pii = async (req, res) => {
//   try {
//     const filename = req.file.path;
//     // const filename = req.file.filename;
//     const basepath = process.env.BASE_PATH;
//     const data = await Four_PII_About.create({
//       info_head: req.body.info_head,
//       info: req.body.info,
//     });

//     if (req.file) {
//       data.image = `${basepath}${filename}`;
//     }
//     console.log(req.file);

//     await data.save();
//     res.json({ message: "about _4pii_Clientle_data", data });
//     console.log(data);
//   } catch (error) {
//     res.send(error);
//     console.log(error);
//   }
// };

module.exports.get_4pii_Data = asyncMiddleware(async (req, res) => {
  // const  lang = req.query.lang
  try {
    const getData = await Four_PII_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

exports.update_4pii = async (req, res) => {
  try {
    const id = req.query.id;

    const data = JSON.parse(req.body.data); // data is JSON string

    const schema = Joi.object({
      advObject1: Joi.string().allow('', null),
      advObject2: Joi.string().allow('', null),
      advObject3: Joi.string().allow('', null),
      title: Joi.string(),
      content: Joi.string(),

      featuresSection: Joi.object({
        sectionTitle: Joi.string(),
        sectionContent: Joi.string(),
        head: Joi.string(),
        content: Joi.string(),
        secionsubContent: Joi.string(),
        features: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            image: Joi.string().optional(),
            head: Joi.string()
          })
        )
      }),

      coreFeaturesSection: Joi.object({
        sectionTitle: Joi.string(),
        sectionContent: Joi.string(),
        head: Joi.string(),
        content: Joi.string(),
        secionsubContent: Joi.string(),
        coreFeatures: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            image: Joi.string().optional(),
            head: Joi.string()
          })
        )
      }),

      useCasesSection: Joi.object({
        sectionTitle: Joi.string(),
        sectionContent: Joi.string(),
        head: Joi.string(),
        content: Joi.string(),
        secionsubContent: Joi.string(),
        image: Joi.string().optional(),
        useCases: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            image: Joi.string().optional(),
            description: Joi.string(),
            head: Joi.string()
          })
        )
      }),

      fourtSection: Joi.object({
        head: Joi.string(),
        content: Joi.string(),
        fourthCases: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            image: Joi.string().optional(),
            description: Joi.string(),
            head: Joi.string()
          })
        )
      }),

      fipthSection: Joi.object({
        head: Joi.string(),
        content: Joi.string(),
        fipthCases: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            image: Joi.string().optional(),
            description: Joi.string(),
            head: Joi.string()
          })
        )
      }),

      sixSection: Joi.object({
        head: Joi.string(),
        content: Joi.string(),
        sixCases: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            image: Joi.string().optional(),
            description: Joi.string(),
            head: Joi.string()
          })
        )
      })
    });

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: "Validation Error",
        details: error.details.map(d => d.message)
      });
    }

    const files = req.files;

    // Process dynamic file uploads
    if (value.featuresSection?.features) {
      value.featuresSection.features.forEach((item, i) => {
        const file = files.featureImages?.[i];
        item.image = file ? `${basePath}/uploads/${file.filename}` : item.image || '';
      });
    }

    if (value.coreFeaturesSection?.coreFeatures) {
      value.coreFeaturesSection.coreFeatures.forEach((item, i) => {
        const file = files.coreFeatureImages?.[i];
        item.image = file ? `${basePath}/uploads/${file.filename}` : item.image || '';
      });
    }

    if (value.useCasesSection?.useCases) {
      value.useCasesSection.useCases.forEach((item, i) => {
        const file = files.useCaseImages?.[i];
        item.image = file ? `${basePath}/uploads/${file.filename}` : item.image || '';
      });

      const sectionImg = files.useCasesSectionImage?.[0];
      value.useCasesSection.image = sectionImg ? `${basePath}/uploads/${sectionImg.filename}` : value.useCasesSection.image || '';
    }

    if (value.fourtSection?.fourthCases) {
      value.fourtSection.fourthCases.forEach((item, i) => {
        const file = files.fouthCaseImages?.[i];
        item.image = file ? `${basePath}/uploads/${file.filename}` : item.image || '';
      });
    }

    if (value.fipthSection?.fipthCases) {
      value.fipthSection.fipthCases.forEach((item, i) => {
        const file = files.fipthCaseImages?.[i];
        item.image = file ? `${basePath}/uploads/${file.filename}` : item.image || '';
      });
    }

    if (value.sixSection?.sixCases) {
      value.sixSection.sixCases.forEach((item, i) => {
        const file = files.sixCaseImages?.[i];
        item.image = file ? `${basePath}/uploads/${file.filename}` : item.image || '';
      });
    }

    // ✅ Update MongoDB document
    const updated = await Four_PII_About.findByIdAndUpdate(id, { $set: value }, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Document not found" });
    }

    return res.status(200).json({ message: "Updated successfully", data: updated });

  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ error: err.message });
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

module.exports.Add_krislin = async (req, res) => {
  try {
    const data = await krislin_About.create({
      info: req.body.info,
      info_head: req.body.info_head,
    });
    if (req.file) {
      data.image = req.file.path;
    }
    console.log(req.file.path);
    await data.save();
    res.json({ message: "about _krislin_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_krislin_Data = asyncMiddleware(async (req, res) => {
  const { lang } = req.query;
  try {
    const getData = await krislin_About.find();
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
    const basepath = process.env.LLP_BASEPATH;
    const filename = req.file.path;
    const data = await LLP_About.create({
      info_head: req.body.info_head,
      info: req.body.info,
    });
    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    await data.save();
    res.json({ message: "about _99ideas_llp_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_llp_Data = asyncMiddleware(async (req, res) => {
  const { lang } = req.query;
  try {
    const getData = await LLP_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.update_llp = asyncMiddleware(async (req, res) => {
  try {
    if (req.file) {
      const filename = req.file.path;
      const basepath = process.env.LLP_BASEPATH;
      //   var filename = req.file.filename;
      //   var basepath = `${req.protocol}://${req.get("host")}/uploads/`;
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
    // console.log(req.params.id)
    console.log(req.body);
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
    const newdata = await LLC_About.findByIdAndDelete(req.body.id);
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
      info_head: req.body.info_head,
      info: req.body.info,
    });
    if (req.file) {
      data.image = `${basepath}${filename}`;
    }
    await data.save();
    res.json({ message: "about _99ideas_llc_data", data });
    console.log(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports.get_llc_Data = asyncMiddleware(async (req, res) => {
  try {
    const getData = await LLC_About.find();
    return res.status(200).send(getData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal server error");
  }
});

module.exports.update_llc = asyncMiddleware(async (req, res) => {
  try {
    if (req.file) {
      const basepath = process.env.LLC_BASEPATH;
      const filename = req.file.path;

      // const basepath = process.env.BASE_PATH;

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
    const mydata = await LLC_About.findByIdAndUpdate(req.body.id, req.body, {
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

//-------------SAAS DATA----------------------------

module.exports.Add_saas = async (req, res) => {
  try {
    const basepath = process.env.SAAS_BASEPATH;
    const filename = req.file.path;
    const data = await saas_About.create({
      info_head: req.body.info_head,
      info: req.body.info,
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
    if (req.file) {
      const basepath = process.env.SAAS_BASEPATH;
      const filename = req.file.path;

      // const basepath = process.env.BASE_PATH;

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
